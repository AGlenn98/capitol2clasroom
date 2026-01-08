# n8n + LegiScan API Quick Start Guide

Get your n8n workflows running with LegiScan API in 15 minutes.

## Overview

You have **3 ready-to-use workflows** that integrate with your existing LegiScan API:

1. **Daily Education Bill Monitor** - Automatic daily checks for new bills
2. **Bill Status Tracker** - Monitor bill changes every 4 hours
3. **Legislator Activity Tracker** - On-demand legislator analysis via webhook

## 5-Step Quick Start

### Step 1: Install n8n (5 minutes)

**Easiest Option - Docker:**

```bash
docker run -d \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

**Alternative - npm:**

```bash
npm install -g n8n
n8n start
```

**Access**: Open `http://localhost:5678` in your browser

### Step 2: Configure LegiScan API Credentials (2 minutes)

1. In n8n, click **Settings** → **Credentials**
2. Click **Create New**
3. Search for "**HTTP Query Auth**"
4. Fill in:
   - **Name**: `LegiScan API`
   - **Parameter Name**: `key`
   - **Value**: Your LegiScan API key (check your `.env` file or Supabase secrets)

5. Click **Save**

### Step 3: Configure Supabase Credentials (2 minutes)

1. Click **Create New** → Search "**Supabase**"
2. Fill in:
   - **Name**: `Capitol2Classroom Supabase`
   - **Host**: `https://tytfkkuhluxrrebslkue.supabase.co`
   - **Service Role Key**: Your `SUPABASE_SERVICE_ROLE_KEY`

3. Click **Save**

### Step 4: Import Your First Workflow (3 minutes)

1. Click **Workflows** → **Import from File**
2. Select: `daily-education-bill-monitor.json`
3. The workflow opens in the editor
4. **Update credentials** in each node that uses them:
   - Click on "LegiScan: Search Education Bills" node
   - Under "Credential to connect with", select your "LegiScan API" credential
   - Repeat for Supabase nodes

5. Click **Save**

### Step 5: Test & Activate (3 minutes)

1. Click **Execute Workflow** (play button at bottom)
2. Watch each node execute and show green checkmarks
3. Review the output data
4. If successful, toggle **Inactive** → **Active** (top right)

**Done!** Your workflow is now running on schedule.

## Testing Individual LegiScan API Calls

Want to test the API before building workflows? Try these:

### Test 1: Search Education Bills

```bash
# Replace YOUR_KEY with your actual LegiScan API key
curl "https://api.legiscan.com/?key=YOUR_KEY&op=search&state=TN&query=education"
```

### Test 2: Get Bill Details

```bash
# Get specific bill (replace bill_id with actual ID from search results)
curl "https://api.legiscan.com/?key=YOUR_KEY&op=getBill&id=1234567"
```

### Test 3: Get TN Sessions

```bash
curl "https://api.legiscan.com/?key=YOUR_KEY&op=getSessionList&state=TN"
```

## Understanding Each Workflow

### Workflow 1: Daily Education Bill Monitor

**What it does**: Searches for Tennessee education bills once per day

**When it runs**: Every day at 8:00 AM

**What happens**:
1. Calls LegiScan search API
2. Filters results for new bills
3. Stores in your Supabase database
4. Sends notification (email/Slack/etc.)

**Customize**:
- **Change time**: Edit "Schedule: Daily 8 AM" node → Set your preferred time
- **Change search**: Edit "LegiScan: Search Education Bills" → Modify `query` parameter
- **Change state**: Modify `state` parameter (currently `TN`)

### Workflow 2: Bill Status Tracker

**What it does**: Monitors subscribed bills for status changes

**When it runs**: Every 4 hours

**What happens**:
1. Fetches list of subscribed bills from `bill_subscriptions` table
2. For each bill, gets current status from LegiScan
3. Compares with cached status
4. If changed, updates database and notifies user

**Customize**:
- **Change frequency**: Edit "Schedule: Every 4 Hours" node
- **Change detection logic**: Edit "Code: Detect Changes" node

### Workflow 3: Legislator Activity Tracker

**What it does**: Analyzes legislator activity when triggered via webhook

**When it runs**: On-demand (webhook trigger)

**How to trigger**:

```bash
# After activating workflow, get webhook URL from n8n
# Then call it like this:
curl -X POST "YOUR_WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{"legislator_id": 12345}'
```

**What happens**:
1. Receives legislator ID via webhook
2. Fetches legislator info from LegiScan
3. Gets all sponsored bills
4. Filters for education-related bills
5. Analyzes activity and returns summary
6. Caches results in Supabase

## Common Customizations

### Change Notification Method

Replace the "Send Notification" node with:

**For Slack:**
1. Add **Slack** node
2. Select "Send Message" operation
3. Choose channel and format message

**For Discord:**
1. Add **Discord** node
2. Select "Send Message" operation
3. Configure webhook URL

**For Email:**
1. Use existing **Email Send** node
2. Configure SMTP settings in credentials

### Add More Search Filters

In the "LegiScan: Search Education Bills" node, add these query parameters:

```javascript
// Current
{ "name": "query", "value": "education" }

// Add multiple keywords
{ "name": "query", "value": "education OR teacher OR school" }

// Filter by year
{ "name": "year", "value": "2" }  // 2 = current year

// Filter by bill type
{ "name": "type", "value": "B" }  // B = Bills only
```

## Troubleshooting

### Problem: "Authentication failed"

**Solution**:
- Verify your LegiScan API key is correct
- Check credentials are properly linked to nodes
- Test API key with curl command above

### Problem: "Workflow not triggering"

**Solution**:
- Ensure workflow is **Activated** (toggle in top right)
- Check n8n is running (`docker ps` or check process)
- Review execution history for errors

### Problem: "No data returned"

**Solution**:
- Verify Tennessee has active sessions
- Try broader search query (e.g., "school" instead of "education")
- Check LegiScan API status

### Problem: "Database errors"

**Solution**:
- Verify Supabase credentials are correct
- Check table names match your schema
- Ensure service role key has proper permissions

## Next Steps

Once your first workflow is running:

1. **Import other workflows** - Try the Bill Status Tracker next
2. **Customize notifications** - Set up Slack/Discord/Email
3. **Create custom workflows** - Use the templates as starting points
4. **Monitor executions** - Check n8n execution logs regularly
5. **Set up error handling** - Add error trigger nodes

## Need Help?

**Resources**:
- Full documentation: See `README.md` in this directory
- n8n Docs: https://docs.n8n.io/
- LegiScan API: https://legiscan.com/legiscan
- Your backend code: `supabase/functions/legislation/index.ts`

**Common Issues**:
- Check n8n execution logs (click on workflow execution)
- Test API endpoints manually with curl
- Verify credentials are correctly configured
- Review node configuration for typos

## Your LegiScan API Endpoints

Your backend already supports these operations:

| Operation | What it does | Example Use |
|-----------|--------------|-------------|
| `search` | Search for bills by keyword | Find education bills |
| `getBill` | Get specific bill details | Track bill status |
| `getMasterList` | Get all bills in session | Daily sync |
| `getSessionList` | Get legislative sessions | Session info |
| `getSponsoredList` | Get legislator's bills | Legislator tracking |
| `getPerson` | Get legislator info | Profile data |

**Backend File**: `/home/user/capitol2clasroom/supabase/functions/legislation/index.ts`

All operations are already implemented and tested in your codebase!

## Pro Tips

1. **Start small**: Get one workflow working before importing others
2. **Test manually first**: Use "Execute Workflow" before activating
3. **Check each node**: View output data to verify correctness
4. **Use error handling**: Add error trigger nodes for reliability
5. **Cache strategically**: Store frequently-accessed data to reduce API calls
6. **Monitor rate limits**: LegiScan may have usage limits
7. **Log everything**: Enable detailed logging for debugging

---

**Ready to start?** Go to Step 1 and install n8n!
