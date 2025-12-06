import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const { billTitle, billDescription, billNumber, action } = await req.json();

    if (!billTitle) {
      throw new Error('billTitle is required');
    }

    let systemPrompt = '';
    let userPrompt = '';

    if (action === 'summary') {
      systemPrompt = `You are an education policy expert who explains complex legislation in plain English. 
      Your summaries should be:
      - Written at an 8th-grade reading level
      - 2-3 sentences maximum
      - Focus on what the bill DOES, not procedural details
      - Avoid jargon and legal terms`;
      
      userPrompt = `Summarize this Tennessee education bill in plain English:
      
Bill: ${billNumber}
Title: ${billTitle}
${billDescription ? `Description: ${billDescription}` : ''}

Write a simple 2-3 sentence summary of what this bill would do if passed.`;
    } 
    else if (action === 'impact') {
      systemPrompt = `You are an education policy analyst. Assess legislation impact on key stakeholder groups.
      Return ONLY a valid JSON object with this exact structure, no markdown or extra text:
      {
        "funding": { "direction": "up" | "down" | "neutral", "score": 1-5 },
        "teachers": { "direction": "up" | "down" | "neutral", "score": 1-5 },
        "parents": { "direction": "up" | "down" | "neutral", "score": 1-5 },
        "students": { "direction": "up" | "down" | "neutral", "score": 1-5 }
      }
      Score 1 = minimal impact, 5 = major impact. Direction indicates if the change benefits (up) or restricts (down) that group.`;
      
      userPrompt = `Analyze the impact of this Tennessee education bill:
      
Bill: ${billNumber}
Title: ${billTitle}
${billDescription ? `Description: ${billDescription}` : ''}

Return ONLY the JSON impact assessment.`;
    }
    else if (action === 'stakeholders') {
      systemPrompt = `You are a nonpartisan policy analyst. Provide balanced stakeholder perspectives.
      Return ONLY a valid JSON object with this exact structure, no markdown or extra text:
      {
        "support": [
          { "group": "Group Name", "argument": "Their main argument in favor (1 sentence)" }
        ],
        "oppose": [
          { "group": "Group Name", "argument": "Their main argument against (1 sentence)" }
        ]
      }
      Include 2-3 groups on each side. Common groups: Teacher Unions, School Board Associations, Parent Organizations, Civil Rights Groups, Business Coalitions, Religious Organizations.`;
      
      userPrompt = `Analyze stakeholder positions on this Tennessee education bill:
      
Bill: ${billNumber}
Title: ${billTitle}
${billDescription ? `Description: ${billDescription}` : ''}

Return ONLY the JSON stakeholder analysis.`;
    }
    else {
      throw new Error('Invalid action. Use: summary, impact, or stakeholders');
    }

    console.log(`Processing ${action} for ${billNumber}`);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.3,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'AI credits exhausted. Please add credits.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';

    console.log(`Successfully generated ${action} for ${billNumber}`);

    // For impact and stakeholders, parse the JSON
    if (action === 'impact' || action === 'stakeholders') {
      try {
        // Clean up any markdown code blocks
        const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        const parsed = JSON.parse(cleanContent);
        return new Response(JSON.stringify({ result: parsed }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (parseError) {
        console.error('Failed to parse JSON:', content);
        return new Response(JSON.stringify({ result: content, raw: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    return new Response(JSON.stringify({ result: content }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in bill-analysis function:', errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
