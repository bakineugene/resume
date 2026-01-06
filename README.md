# Resume Generator

A simple resume generator that creates HTML resumes from JSON data using templates.

## Project Structure

```
├── generator.js          # Main generator script
├── resume/
│   ├── resume-eng.json  # English resume data
│   ├── resume-ru.json   # Russian resume data
│   └── skills.json      # Common skills data
├── templates/
│   └── basic-html/       # HTML template with CSS
└── build/               # Output directory (created when generating resumes)
```

## JSON Structure Documentation

The JSON resume data file should contain the following structure based on the template variables used:

### Root Object
```json
{
  "globals": { },
  "basics": { },
  "companies": [ ]
}
```

Note: Skills are stored in a separate `skills.json` file and automatically merged with the resume data during generation.

### Globals Section
Contains internationalization strings used in the template:

```json
"globals": {
  "i18_general": "General",
  "i18_profession": "Profession",
  "i18_location": "Location",
  "i18_contacts": "Contacts",
  "i18_mail": "E-mail",
  "i18_website": "Web-site",
  "i18_skills": "Skills",
  "i18_education": "Education",
  "i18_work": "Work",
  "i18_experience": "Work Experience",
  "i18_actively_using": "Actively Using",
  "i18_familiar": "Familiar"
}
```

### Basics Section
Contains personal information and summary:

```json
"basics": {
  "name": "Your Name",
  "label": "Your Profession",
  "email": "your.email@example.com",
  "website": "https://yourwebsite.com",
  "summary": "A brief summary about yourself",
  "startedWorking": "2013",
  "startedWorkingText": "since 2013",
  "location": {
    "country": "Country",
    "region": "Region",
    "city": "City"
  },
  "profiles": [],
  "education": [
    {
      "institution": "University Name",
      "website": "https://university.edu",
      "area": "Your Major",
      "degree": "Degree Type",
      "startDate": "2010-09-01",
      "endDate": "2014-06-01"
    }
  ]
}
```

### Companies Section
List of work experiences:

```json
"companies": [
  {
    "company": "Company Name",
    "position": "Your Position",
    "website": "https://company.com",
    "startDate": "2020-01-01",
    "endDate": null,
    "summary": "Description of your role and responsibilities",
    "projects": [
      {
        "name": "Project Name",
        "description": "Project description",
        "website": "https://project-url.com",
        "tags": ["JavaScript", "HTML", "CSS"]
      }
    ]
  }
]
```

### Skills Section
Skills are stored in a separate `skills.json` file with the following structure:

```json
"skills": [
  {
    "name": "Skill Name",
    "level": "4/5",
    "type": "actively"
  }
]
```

Skills are displayed in two separate sections in the resume:
1. "Actively Using" - Skills used regularly (displayed in black)
2. "Familiar" - Skills with basic knowledge (displayed in gray)

## Template Variables Reference

### Header Section
- `{{basics.name}}` - Displayed in title tag, h1, and avatar alt attribute
- `{{i18_general}}` - "General" section heading
- `{{i18_profession}}` - Label for profession field
- `{{basics.label}}` - Profession/Title
- `{{i18_location}}` - Label for location field
- `{{basics.location.country}}` - Country
- `{{basics.location.region}}` - Region/State
- `{{basics.location.city}}` - City
- `{{i18_experience}}` - Label for work experience field
- `{{basics.startedWorking}}` - Start date for work experience (datetime attribute)
- `{{basics.startedWorkingText}}` - Display text for work experience
- `{{i18_contacts}}` - "Contacts" section heading
- `{{i18_mail}}` - Label for email field
- `{{basics.email}}` - Email address
- `{{i18_website}}` - Label for website field (conditional)
- `{{basics.website}}` - Website URL (conditional)
- `{{basics.profiles}}` - Social profiles array (repeating section)
- `{{network}}` - Social network name
- `{{url}}` - Social profile URL
- `{{username}}` - Social profile username
- `{{basics.summary}}` - Personal summary

### Skills Section
- `{{i18_skills}}` - "Skills" section heading
- `{{i18_actively_using}}` - "Actively Using" section heading
- `{{i18_familiar}}` - "Familiar" section heading
- `{{skills}}` - Skills array (repeating section)
- `{{name}}` - Skill name
- `{{level}}` - Skill level
- `{{type}}` - Skill type (actively/familiar)

### Education Section
- `{{i18_education}}` - "Education" section heading
- `{{basics.education}}` - Education array (repeating section)
- `{{institution}}` - Institution name
- `{{website}}` - Institution website (conditional)
- `{{degree}}` - Degree type
- `{{startDate}}` - Start date
- `{{endDate}}` - End date (conditional)
- `{{area}}` - Area of study

### Work Experience Section
- `{{i18_work}}` - "Work" section heading
- `{{companies}}` - Companies array (repeating section)
- `{{company}}` - Company name
- `{{website}}` - Company website (conditional)
- `{{position}}` - Position title
- `{{startDate}}` - Start date
- `{{endDate}}` - End date (conditional)
- `{{summary}}` - Role summary
- `{{projects}}` - Projects array (repeating section)
- `{{name}}` - Project name
- `{{description}}` - Project description
- `{{website}}` - Project website (conditional)
- `{{tags}}` - Skills/tags array (repeating section)
- `{{.}}` - Individual tag value

## Usage

1. Install dependencies:
   ```bash
   npm install
   ```

2. Customize your resume data in `resume/resume-eng.json` or `resume/resume-ru.json`

3. Generate resumes:
   ```bash
   node generator.js
   ```

4. Find your generated HTML resumes in the `build/` directory

## Customization Options

You can safely remove any of the following sections from your JSON if you don't need them:

### Optional Sections
- `basics.website` - Personal website
- `basics.profiles` - Social profiles array
- `basics.education` - Education section
- `companies` - Work experience section (but resume will be minimal)
- `skills` - Skills section
- Individual company `website`, `endDate`, and `projects` fields
- Individual project `website` field

### Required Fields
For a complete resume, these fields should be present:
- `basics.name`
- `basics.label`
- `basics.email`
- `basics.summary`
- `basics.location` (with country, region, and city)
- `basics.startedWorking`
- `basics.startedWorkingText`
- All `globals` fields for proper internationalization

If any required field is missing, the template will still render but may have blank sections or missing information.