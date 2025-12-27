# n8n Workflows for Capitol2Classroom

This directory contains n8n workflow templates for automating LegiScan API interactions.

## Table of Contents

- [Getting Started](#getting-started)
- [Setup Instructions](#setup-instructions)
- [Available Workflows](#available-workflows)
- [LegiScan API Integration](#legiscan-api-integration)
- [Troubleshooting](#troubleshooting)

## Getting Started

### What is n8n?

n8n is a workflow automation tool that lets you connect different services and APIs without writing code. It's perfect for:
- Scheduling recurring tasks (daily bill checks)
- Monitoring data changes (bill status updates)
- Automating notifications
- Data synchronization between services

### Prerequisites

- LegiScan API key (already configured in your project)
- Supabase credentials (already set up)
- n8n installed (see Setup Instructions below)

## Setup Instructions

### Step 1: Install n8n

Choose one of these methods:

#### Option A: Docker (Recommended)

```bash
# Pull and run n8n
docker run -d \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n

# Access n8n at http://localhost:5678
```

#### Option B: npm

```bash
# Install globally
npm install -g n8n

# Start n8n
n8n start

# Access at http://localhost:5678
```

#### Option C: n8n Cloud

Visit [n8n.cloud](https://n8n.io/cloud) and sign up for a free account.

### Step 2: Configure Credentials in n8n

Once n8n is running:

#### 2.1 Add LegiScan API Credentials

1. Open n8n at `http://localhost:5678`
2. Go to **Settings** (gear icon) → **Credentials**
3. Click **Add Credential**
4. Select **HTTP Query Auth**
5. Configure:
   - **Credential Name**: `LegiScan API`
   - **Name**: `key`
   - **Value**: Your LegiScan API key from environment variables

#### 2.2 Add Supabase Credentials

1. Click **Add Credential** → **Supabase**
2. Configure:
   - **Host**: `https://tytfkkuhluxrrebslkue.supabase.co`
   - **Service Role Secret**: Your `SUPABASE_SERVICE_ROLE_KEY`

### Step 3: Import Workflows

1. In n8n, click **Workflows** → **Import from File**
2. Select one of the workflow JSON files from this directory
3. The workflow will open in the editor
4. Update any credential references to match your setup
5. Click **Save**

### Step 4: Test Your Workflow

1. Click **Execute Workflow** to test manually
2. Check the output of each node
3. Verify data is flowing correctly
4. Once working, activate the workflow with the toggle switch

## Available Workflows

### 1. Daily Education Bill Monitor

**File**: `daily-education-bill-monitor.json`

**Purpose**: Automatically check for new Tennessee education bills every day

**Schedule**: Daily at 8:00 AM

**Flow**:
```
Schedule Trigger
  ↓
LegiScan Search API (state=TN, query=education)
  ↓
Filter New Bills
  ↓
Store in Supabase
  ↓
Transform Data
  ↓
Send Notification
```

**Use Case**: Get daily digest of new education legislation without manual checking

**Customization**:
- Change schedule in "Schedule: Daily 8 AM" node
- Modify search query in "LegiScan: Search Education Bills" node
- Update notification method (Email, Slack, Discord, etc.)

### 2. Bill Status Change Tracker

**File**: `bill-status-tracker.json`

**Purpose**: Monitor subscribed bills for status changes and notify users

**Schedule**: Every 4 hours

**Flow**:
```
Schedule Trigger
  ↓
Get Subscribed Bills from Supabase
  ↓
Loop Over Each Bill
  ↓
Fetch Current Bill Status from LegiScan
  ↓
Compare with Cached Status
  ↓
If Changed → Update Database & Notify Users
```

**Use Case**: Alert users when their tracked bills have status updates

**Customization**:
- Adjust polling frequency
- Customize notification content
- Add additional change detection logic

## LegiScan API Integration

### Available LegiScan Operations

Your existing backend supports these operations:

```javascript
// Already implemented in: supabase/functions/legislation/index.ts

1. getSessionList        // Get TN legislative sessions
2. getMasterList         // Get all bills from current session
3. getBill(bill_id)      // Get specific bill details
4. search(query)         // Search bills (currently: "education")
5. getSponsoredList(id)  // Get bills by legislator
6. getPerson(id)         // Get legislator details
```

### Using LegiScan in n8n Workflows

#### Basic HTTP Request Node Configuration

```json
{
  "method": "GET",
  "url": "https://api.legiscan.com/",
  "authentication": "genericCredentialType",
  "genericAuthType": "queryAuth",
  "queryParameters": {
    "parameters": [
      {
        "name": "key",
        "value": "={{$credentials.apiKey}}"
      },
      {
        "name": "op",
        "value": "search"
      },
      {
        "name": "state",
        "value": "TN"
      },
      {
        "name": "query",
        "value": "education"
      }
    ]
  }
}
```

#### Example API Calls

**Search for bills:**
```
GET https://api.legiscan.com/?key=YOUR_KEY&op=search&state=TN&query=education
```

**Get bill details:**
```
GET https://api.legiscan.com/?key=YOUR_KEY&op=getBill&id=1234567
```

**Get session list:**
```
GET https://api.legiscan.com/?key=YOUR_KEY&op=getSessionList&state=TN
```

### Response Structure

LegiScan returns JSON in this format:

```json
{
  "status": "OK",
  "searchresult": {
    "summary": [
      {
        "bill_id": 1234567,
        "bill_number": "HB1234",
        "title": "Education Bill Title",
        "status": 3,
        "status_date": "2025-01-15",
        "url": "https://legiscan.com/TN/bill/HB1234/2025"
      }
    ]
  }
}
```

## Common Workflow Patterns

### Pattern 1: Scheduled Data Sync

```
Schedule Trigger → API Call → Transform → Store in DB
```

**Use for**: Regular data updates, monitoring

### Pattern 2: Webhook-Based Processing

```
Webhook Trigger → Validate → Process → Multiple Actions
```

**Use for**: Real-time updates, user-initiated actions

### Pattern 3: Change Detection

```
Get Cached Data → Fetch Current Data → Compare → If Changed → Notify
```

**Use for**: Status monitoring, alerting

### Pattern 4: Data Aggregation

```
Multiple API Calls → Merge Data → Analyze → Generate Report
```

**Use for**: Analytics, reporting

## Advanced Customization

### Adding Custom Notifications

Replace the "Send Notification" node with:

- **Slack**: Use Slack node to post to channels
- **Discord**: Use Discord node for server notifications
- **Email**: Configure SMTP for email alerts
- **SMS**: Use Twilio for text notifications
- **Push**: Use Pushover or similar for mobile push

### Storing Data in Supabase

Example Supabase Insert node:

```json
{
  "operation": "insert",
  "table": "your_table",
  "columns": "bill_id, title, status, created_at",
  "values": "={{$json.bill_id}},={{$json.title}},={{$json.status}},={{$now}}"
}
```

### Error Handling

Add an **Error Trigger** node to handle failures:

1. Add "Error Trigger" node
2. Connect to notification system
3. Log errors to monitoring service

## Troubleshooting

### Common Issues

#### 1. API Key Not Working

**Symptom**: HTTP 403 or authentication errors

**Solution**:
- Verify API key in n8n credentials
- Check key is active in LegiScan dashboard
- Ensure query auth is configured correctly

#### 2. Rate Limiting

**Symptom**: HTTP 429 errors

**Solution**:
- Add delay between requests
- Use batch processing
- Cache responses when possible

#### 3. Workflow Not Triggering

**Symptom**: Scheduled workflows don't run

**Solution**:
- Verify workflow is activated (toggle on)
- Check n8n is running
- Review execution logs

#### 4. Data Not Updating

**Symptom**: Old data persists

**Solution**:
- Clear n8n execution cache
- Check database connections
- Verify update queries

### Debug Tips

1. **Use Manual Execution**: Test workflows manually before scheduling
2. **Check Each Node**: View output of individual nodes
3. **Enable Logging**: Turn on detailed logs in n8n settings
4. **Test with Webhooks**: Use webhook.site for testing
5. **Validate JSON**: Use JSONLint for response validation

## Environment Variables

Required for backend Supabase functions:

```bash
# LegiScan API
LEGISCAN_API_KEY=your_legiscan_api_key

# Supabase
SUPABASE_URL=https://tytfkkuhluxrrebslkue.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Optional: Other integrations
LOVABLE_API_KEY=your_lovable_key       # For bill analysis
GNEWS_API_KEY=your_gnews_key           # For news fetching
```

## Next Steps

1. **Start Simple**: Import and test the daily monitor workflow first
2. **Customize**: Modify schedules and queries to your needs
3. **Expand**: Create new workflows based on patterns above
4. **Monitor**: Set up error notifications and logging
5. **Optimize**: Cache data and batch operations for efficiency

## Resources

- [n8n Documentation](https://docs.n8n.io/)
- [LegiScan API Docs](https://legiscan.com/legiscan)
- [Supabase n8n Integration](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.supabase/)
- [HTTP Request Node Docs](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/)

## Support

If you encounter issues:

1. Check n8n execution logs
2. Verify API credentials
3. Test API endpoints manually
4. Review workflow node configuration
5. Check database permissions

## Contributing

To add new workflows:

1. Create workflow in n8n
2. Export as JSON
3. Add to this directory
4. Document in this README
5. Test thoroughly before committing
