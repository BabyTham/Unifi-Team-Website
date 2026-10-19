/* =====================================================================
   WEBSITE CONTENT  —  edit this file to update the websit
   =====================================================================

   Everything that changes over time lives here: the impact numbers,
   team members (cards + profile popups), quotes, achievements,
   the behind-the-scenes photos and the scrapbook.

   HOW TO EDIT
   • Change the text between the "double quotes". Keep the quotes.
   • Every item in a list ends with a comma, except the last one.
   • To ADD something, copy a whole block { ... } including its comma,
     paste it where you want it, then change the text.
   • To REMOVE something, delete its whole block { ... } and its comma.
   • To start a new line inside a text, type \n  (two of them = blank line).
   • Pictures: put the file in the images/ folder (see README.md) and type
     its path here, e.g. "images/team/jane-doe/card.jpg". Paths are
     case-sensitive: "Card.JPG" is not the same as "card.jpg".

   CHECK YOUR CHANGE
   Save, then open index.html in a browser (or refresh with Ctrl+F5).
   If something is wrong, a red box at the top of the page tells you what.
   ===================================================================== */

window.SITE_CONTENT = {

  /* -------------------------------------------------------------------
     OUR IMPACT — the coloured number tiles
     colour: "cream" | "orange" | "blue" | "indigo"
     countFrom (optional): the number the animation counts up from
     ------------------------------------------------------------------- */
  impact: [
    {
      value: "2% → 8%",
      countFrom: 2,
      title: "Channel Mix Digital",
      text: "Growing digital contribution across the channel mix.",
      colour: "cream"
    },
    {
      value: "0.22% → 0.62%",
      countFrom: 0.22,
      title: "SLOF Conversion 2025 - 2026",
      text: "Better journey, clearer information, stronger calls to action.",
      colour: "orange"
    },
    {
      value: "28%",
      title: "Growth Organic Traffic (YoY)",
      text: "Strong 28% YoY growth in organic traffic from SEO-enhanced pages.",
      colour: "blue"
    },
    {
      value: "313%",
      title: "Devices Sales from Online Channel 2024 - 2026",
      text: "Creating exclusive offers that drive online engagement.",
      colour: "indigo"
    },
    {
      value: "13.9%",
      title: "Digital Broadband Sales Increase 2025 - 2026",
      text: "Growing digital contribution across the channel mix.",
      colour: "cream"
    },
    {
      value: "264%",
      title: "Growth Online Tv Sales (Unifi TV)",
      text: "More customers choosing to sign up for Unifi TV online.",
      colour: "orange"
    }
  ],



  /* -------------------------------------------------------------------
     TEAM — one block per person, in the order they appear on the page.
     Clicking a card opens the profile popup (the "profile" part).

     personaColour: "orange" | "navy" | "blue"   (the pill under the photo)
     focusColour:   "orange" | "blue"            (the coloured focus line)
     photos.card:    rectangular photo for the team card (portrait shape)
     photos.profile: optional round photo for the popup. Leave it out and
                     the card photo is used, cropped to a circle.
     ------------------------------------------------------------------- */
  team: [
    {
      name: "HIEW FONG FONG",
      persona: "The Strategist",
      personaColour: "orange",
      focus: "Acquisition Strategy & Growth",
      focusColour: "orange",
      summary: "Sets the direction, shapes the acquisition strategy and drives the overall digital growth agenda.",
      photos: {
        card: "images/team/hiew-fong-fong/card.jpg",
        profile: "images/team/hiew-fong-fong/profile.png"
      },
      profile: {
        fullName: "HIEW FONG FONG",
        role: "Head, New Customer Acquisition",
        overviewTitle: "PROFILE OVERVIEW",
        overview: [
          "Hiew is a digital leader at Telekom Malaysia whose public profile emphasises growth, efficiency and customer-focused digital outcomes, with her current remit centred on new customer acquisition.",
          "Her public credentials also show continued development across digital strategy, digital marketing, user experience and people leadership."
        ],
        highlight: {
          label: "TEAM RECOGNITION",
          title: "MARKETING EXCELLENCE 2025",
          text: "Named among the Unifi and Unifi Business team congratulated after multiple Gold and Bronze wins across major 2025 campaigns."
        },
        detailsTitle: "PUBLIC PROFILE HIGHLIGHTS",
        details: [
          { title: "NEW CUSTOMER ACQUISITION", text: "Public org information lists Hiew as Head, New Customer Acquisition within Unifi Brand & Marketing." },
          { title: "DIGITAL STRATEGY", text: "Certified Digital Marketing Specialist – Strategy and Planning, Digital Marketing Institute (2022)." },
          { title: "DIGITAL MARKETING", text: "Certified Digital Marketing Professional, Digital Marketing Institute (2021)." },
          { title: "UX FOUNDATIONS", text: "Completed Google’s Foundations of User Experience (UX) Design certification in 2024." },
          { title: "LEADERSHIP DEVELOPMENT", text: "Public certifications include Human Leadership, Project Leadership, emotional intelligence and people-management courses." }
        ],
        educationTitle: "EDUCATION",
        education: "Degree in Arts, Mass Communication and Media Studies\n\nUniversiti Tunku Abdul Rahman (2006–2010)"
      }
    },
    {
      name: "FATIMA NUR ZAHRA",
      persona: "The Business Champion",
      personaColour: "navy",
      focus: "Business Portal & Digital Growth",
      focusColour: "blue",
      summary: "Drives the Business Portal experience, enabling businesses to discover, engage and transact digitally.",
      photos: {
        card: "images/team/fatima-nur-zahra/card.jpg",
        profile: "images/team/fatima-nur-zahra/profile.png"
      },
      profile: {
        fullName: "FATIMA NUR ZAHRA BINTI ISMAIL",
        role: "Assistant Manager Content Management (SME) Digital, Division Section New Install (NI)",
        overviewTitle: "PROFILE OVERVIEW",
        overview: [
          "Fatima manages and enhances the Unifi Business digital and web experience, covering website performance, content accuracy, content management, UI/UX, analytics and digital transformation initiatives.",
          "She works closely with business, BA, UI/UX, development and technical teams to translate requirements into effective digital solutions and ensure website changes are delivered accurately and on time."
        ],
        highlight: {
          label: "FEATURED PROJECT",
          title: "IMPAK BIZ",
          text: "End-to-end digital platform delivery: requirements → UI/UX → development → testing → deployment → production support → digital tracking."
        },
        detailsTitle: "KEY RESPONSIBILITIES",
        details: [
          { title: "Website Performance", text: "Audits speed, broken links and technical issues; uses analytics to drive optimisation." },
          { title: "Accuracy & Quality", text: "Resolves obsolete campaigns, typos and inconsistencies while protecting content quality." },
          { title: "Content Management", text: "Coordinates minor and major website changes with internal teams and clear approvals." },
          { title: "Prioritisation & Tracking", text: "Prioritises website requests by urgency and impact and tracks them through completion." },
          { title: "Change Documentation", text: "Maintains centralised records of website changes, approvals and completion dates." }
        ],
        educationTitle: "EDUCATION",
        education: "Diploma In Information Technology\n\nDegree in Information System"
      }
    },
    {
      name: "STEPHEN JEGANATHAN",
      persona: "The Campaign Driver",
      personaColour: "blue",
      focus: "Digital Campaigns & Acquisition",
      focusColour: "orange",
      summary: "Turns campaigns into acquisition opportunities, driving traffic, engagement and sales.",
      photos: {
        card: "images/team/stephen-jeganathan/card.jpg",
        profile: "images/team/stephen-jeganathan/profile.png"
      },
      profile: {
        fullName: "STEPHEN JEGANATHAN",
        role: "Manager Digital Campaign",
        overviewTitle: "PROFILE OVERVIEW",
        overview: [
          "Stephen manages and optimises Unifi’s digital customer journey on unifi.com.my, with a focus on online sales, conversion and campaign delivery. In 2026, he was involved in the TaaS PI-5 migration project and led the revamp of the Unifi Developer Partnership (UDP) program, including the purchase-journey transition from iJOIN to SLOF.",
          "The revamped program supported the launch of four new UDP projects in 2026, strengthening the digital purchase experience and partner-program delivery."
        ],
        highlight: {
          label: "CARRER HIGHTLIGHTS",
          title: "16 YEARS AT TM",
          text: "Career progression across fraud investigation, risk & assurance, strategy, OTT partnerships, vernacular content and digital campaign management. Public profile data also lists Group CEO Merit Awards in 2021 and 2023."
        },
        detailsTitle: "KEY PROJECTS & 2026 DELIVERY",
        details: [
          { title: "TaaS PI-5 MIGRATION", text: "Involved in the 2026 TaaS PI-5 migration project, supporting delivery during the platform transition." },
          { title: "UDP PROGRAM REVAMP", text: "Led the 2026 revamp of the Unifi Developer Partnership program." },
          { title: "iJOIN → SLOF JOURNEY", text: "Revamped the UDP purchase journey from iJOIN to SLOF to create a refreshed buying flow." },
          { title: "4 NEW UDP PROJECTS", text: "Successfully launched four new Unifi Developer Partnership projects in 2026." },
          { title: "2026 PROJECT DELIVERY", text: "Led and supported migration, journey-revamp and partner-program initiatives across the year." }
        ],
        educationTitle: "EDUCATION",
        education: "Bachelor of Arts (BA)\nUniversity of Greenwich\n\nDiploma in Accounting\nMultimedia University (MMU)"
      }
    },
    {
      name: "WAN AFIFAH NAJIHAH",
      persona: "The Optimiser",
      personaColour: "orange",
      focus: "Sales Performance & Conversion",
      focusColour: "blue",
      summary: "Turns data and insights into action, optimising the digital funnel to improve conversion and maximise sales.",
      photos: {
        card: "images/team/wan-afifah-najihah/card.jpg",
        profile: "images/team/wan-afifah-najihah/profile.png"
      },
      profile: {
        fullName: "WAN AFIFAH NAJIHAH BINTI WAN MOHD SYUKRI",
        role: "Assistant Manager, Web Optimization Specialist",
        overviewTitle: "PROFILE OVERVIEW",
        overview: [
          "Afifah oversees the performance of key digital products across Home Broadband, Postpaid, Prepaid, Devices and Unifi TV, with a focus on Net Adds (NI) performance and conversion optimisation.",
          "She combines performance monitoring, inventory planning and customer-journey insight to support business targets and improve conversion across digital channels."
        ],
        highlight: {
          label: "KEY CONTRIBUTIONS",
          title: "UNIFI ESHOP EXPERIENCE",
          text: "Website Revamp: business and performance insights improved the Devices and Postpaid purchase journey.  •  WhatsApp Integration: direct agent assistance reduced friction during online registration and application."
        },
        detailsTitle: "KEY RESPONSIBILITIES",
        details: [
          { title: "DIGITAL PRODUCT PERFORMANCE", text: "Oversees product performance and Net Adds across Home Broadband, Mobile, Devices and Unifi TV." },
          { title: "DEVICE INVENTORY PLANNING", text: "Plans stock availability, replenishment and forecasts for upcoming launches with Device Operations." },
          { title: "SALES & ACTIVATION MONITORING", text: "Monitors daily sales, activations and cancellations across Home and Mobile against business targets." },
          { title: "WEBSITE & JOURNEY OPTIMISATION", text: "Provides insights to improve website performance, customer journeys and conversion rates across digital channels." },
          { title: "DIGITAL PRODUCT SCOPE", text: "Home Broadband  ·  Postpaid  ·  Prepaid  ·  Devices  ·  Unifi TV" }
        ],
        educationTitle: "EDUCATION",
        education: "Bachelor of Electronics Engineering (Hons.) in Computer Engineering\n\nMultimedia University (MMU), Cyberjaya"
      }
    },
    {
      name: "FARHAN AL HAFIZ",
      persona: "The Revenue Commander",
      personaColour: "navy",
      focus: "Digital Operations & Sales Recovery",
      focusColour: "orange",
      summary: "Leads 30-person operations force to process, recover and maximise every sales lead — turning opportunities that could be lost into revenue.",
      photos: {
        card: "images/team/farhan-al-hafiz/card.jpg",
        profile: "images/team/farhan-al-hafiz/profile.png"
      },
      profile: {
        fullName: "FARHAN AL HAFIZ BIN MUSTAFAR ALBAKRI",
        role: "Assistant Manager Digital Operations",
        overviewTitle: "PROFILE OVERVIEW",
        overview: [
          "Farhan drives operational performance, customer experience and team productivity through performance management, customer lifecycle oversight, stakeholder coordination and continuous process improvement.",
          "His work spans business performance monitoring, customer engagement, operational issue resolution, team development and data analysis to keep service delivery aligned with business objectives and quality standards."
        ],
        highlight: {
          label: "KEY CONTRIBUTIONS",
          title: "OPERATIONAL EXCELLENCE & GROWTH",
          text: "Led performance and productivity initiatives, strengthened customer lifecycle management, supported retention and reduced fallout through data-driven process improvement and cross-functional coordination."
        },
        detailsTitle: "KEY RESPONSIBILITIES",
        details: [
          { title: "PERFORMANCE & PRODUCTIVITY", text: "Monitors operational performance and leads productivity improvement initiatives to support business targets." },
          { title: "CUSTOMER LIFECYCLE & RETENTION", text: "Oversees verification, onboarding, follow-ups, retention efforts and issue resolution to strengthen customer experience." },
          { title: "QUALITY & FALLOUT REDUCTION", text: "Drives quality verification and proactive follow-up to reduce return orders, fallout cases and service issues." },
          { title: "DATA & PROCESS IMPROVEMENT", text: "Uses performance insights to identify gaps, support decisions, streamline workflows and improve business outcomes." },
          { title: "TEAM & STAKEHOLDER ENABLEMENT", text: "Collaborates across functions, coaches team members and promotes knowledge sharing, accountability and operational excellence." }
        ],
        educationTitle: "EDUCATION",
        education: "Bachelor’s Degree in Computer Software Engineering"
      }
    },
    {
      name: "NUR HAZIRAH",
      persona: "The Digital Enabler",
      personaColour: "blue",
      focus: "Website Enablement & Digital Health",
      focusColour: "blue",
      summary: "Brings campaigns and launches to life digitally, while keeping the website healthy, reliable and always ready for business.",
      photos: {
        card: "images/team/nur-hazirah/card.jpg",
        profile: "images/team/nur-hazirah/profile.png"
      },
      profile: {
        fullName: "NUR HAZIRAH BINTI MOHAMMAD KHIR",
        role: "Assistant Manager Back-End",
        overviewTitle: "PROFILE OVERVIEW",
        overview: [
          "Nur Hazirah Binti Mohammad Khir is part of Telekom Malaysia’s Digital division, with her team profile aligned to eShop and website development.",
          "Her responsibilities include managing request for portal enhancement (eshop/idiscover for NI) and ensure the items requested by the team are being registered in the Github and will be included into sprint planning."
        ],
        highlight: {
          label: "KEY PROJECT FOCUS",
          title: "ESHOP JOURNEY & DELIVERY",
          text: "Channel lead and product owner across TaaS Pi-5 migration, iJoin journey revamp and New Install BAU — covering DVT readiness, stakeholder timelines, enhancements, bug fixes and sprint planning."
        },
        detailsTitle: "KEY PROJECTS & DELIVERY",
        details: [
          { title: "TaaS PI-5 MIGRATION", text: "Channel lead during DVT, ensuring eShop journeys worked as intended during migration to the new TaaS back-end." },
          { title: "iJOIN JOURNEY REVAMP", text: "Product owner for the new iJoin journey, keeping WIP aligned to stakeholder timelines and reducing journey drop-off." },
          { title: "BAU / NEW INSTALL", text: "Manages stakeholder requests, channel readiness, enhancements and bug fixes for New Install customers." },
          { title: "CHANNEL READINESS", text: "Ensures eShop journeys remain functional and ready across DVT, enhancements and BAU delivery." },
          { title: "SPRINT DELIVERY", text: "Oversees in-progress development and sprint planning for enhancements, fixes and stakeholder requests." }
        ],
        educationTitle: "EDUCATION",
        education: "Diploma in Education, Electrical and Electronics Engineering\n\nDegree in Information and Technology, Data communication and Networking"
      }
    },
    {
      name: "AHMAD NAJMI",
      persona: "The Content Strategist",
      personaColour: "orange",
      focus: "Web Content & Customer Experience",
      focusColour: "orange",
      summary: "Transforms product information into clear, engaging content that helps customers understand, choose and convert.",
      photos: {
        card: "images/team/ahmad-najmi/card.jpg",
        profile: "images/team/ahmad-najmi/profile.png"
      },
      profile: {
        fullName: "AHMAD NAJMI BIN NAILLUL HAFIDZ",
        role: "Assistant Manager for Web Content Mangement",
        overviewTitle: "ROLE OVERVIEW",
        overview: [
          "Manages and maintains Unifi website content across updates, campaign deployment, page enhancements, promotional materials and content optimisation to keep digital experiences clear, current and conversion-focused.",
          "Nearly 16 years with TM across Enterprise Product Marketing, Unifi TV and Unifi Digital, with experience spanning SaaS & Cloud, sports marketing, SEO, Drupal and website optimisation."
        ],
        highlight: {
          label: "IMPACT HIGHLIGHT",
          title: "SMARTHOME\nCONVERSION",
          text: "Introduced targeted special deals through the iJoin intercept, contributing to a 200% increase in Smarthome bundle sales in May."
        },
        detailsTitle: "KEY PROJECTS & CONTRIBUTIONS",
        details: [
          { title: "UNIFI TV JOURNEY REVAMP", text: "Led the iDiscovery and purchase journey revamp to simplify navigation, improve content clarity and create a smoother purchase experience." },
          { title: "FIFA WORLD CUP 2026", text: "Delivered the FIFA World Cup 2026 microsite in June, supporting campaign objectives through a dedicated digital experience." },
          { title: "SEO & ORGANIC GROWTH", text: "Drove ongoing Unifi Portal SEO optimisation in 2025/2026, improving organic visibility and contributing to growth in organic traffic." },
          { title: "WEB CONTENT MANAGEMENT", text: "Manages content updates, campaign deployment, page enhancements, promotional materials and continuous content optimisation." }
        ],
        educationTitle: "CAREER BACKGROUND",
        education: "TM ENTERPRISE — 9 YEARS\nEnterprise Product Marketing / SaaS & Cloud Services\n\nUNIFI TV — 3 YEARS\nSports content marketing & digital campaigns\n\nUNIFI DIGITAL — 4 YEARS\nWeb content, SEO, digital marketing, optimisation & Drupal"
      }
    }
  ],


  /* -------------------------------------------------------------------
     VOICES BEHIND THE WORK — the quote cards, in the order shown.
     With exactly 7 quotes they form the scattered collage from the
     design; any other number shows them as a tidy list instead.

     colour: "navy" | "orange" | "blue"     (the card colour)
     accent (optional): "orange" | "navy"   (quote mark, line and photo ring)
     attribution (optional): small text under the quote, e.g. "— KOBE BRYANT"
     photo: a round photo with its ring (quote.png), or any square/portrait
            photo, which is then cropped to a circle with an accent ring
     ------------------------------------------------------------------- */
  quotes: [
    {
      name: "HIEW FONG FONG",
      text: "You don’t have to solve everything at once. Take it one bite at a time, but keep moving forward",
      colour: "navy",
      photo: "images/team/hiew-fong-fong/quote.png"
    },
    {
      name: "FARHAN AL HAFIZ",
      text: "I always give 100% at work: 13% Monday, 22% Tuesday, 40% Wednesday, 20% Thursday, 5% Friday.",
      colour: "orange",
      photo: "images/team/farhan-al-hafiz/quote.png"
    },
    {
      name: "WAN AFIFAH NAJIHAH",
      text: "Keep going. Good things take time.",
      colour: "blue",
      accent: "navy",
      photo: "images/team/wan-afifah-najihah/quote.png"
    },
    {
      name: "AHMAD NAJMI",
      text: "Semua boleh buat!",
      colour: "navy",
      photo: "images/team/ahmad-najmi/quote.png"
    },
    {
      name: "NUR HAZIRAH",
      text: "The real corporate skill isn’t knowing everything. It’s knowing who to ask.",
      colour: "blue",
      photo: "images/team/nur-hazirah/quote.png"
    },
    {
      name: "STEPHEN JEGANATHAN",
      text: "Rest at the end, not in the middle.",
      attribution: "— KOBE BRYANT",
      colour: "orange",
      photo: "images/team/stephen-jeganathan/quote.png"
    },
    {
      name: "FATIMA NUR ZAHRA",
      text: "Always learning. Always improving. Always delivering.",
      colour: "navy",
      photo: "images/team/fatima-nur-zahra/quote.png"
    }
  ],


  /* -------------------------------------------------------------------
     OUR GREATEST HITS — the achievements carousel (any number of cards).
     image: landscape photo, shown about 300 × 186 (it's cropped to fit)
     ------------------------------------------------------------------- */
  achievements: [
    {
      title: "IMPAK BIZ",
      tag: "FEATURED INITIATIVE",
      text: "End-to-end digital platform delivery spanning requirements, UI/UX, development, testing, deployment, production support and digital tracking.",
      result: "End-to-end platform delivery",
      image: "images/achievements/impak-biz.jpg"
    },
    {
      title: "TaaS PI-5 Migration",
      tag: "PLATFORM MIGRATION",
      text: "Supported the 2026 platform transition, including eShop DVT readiness and continuity of customer journeys during migration.",
      result: "2026 migration readiness",
      image: "images/achievements/taas-pi5-migration.jpg"
    },
    {
      title: "UDP Program Revamp",
      tag: "PARTNER PROGRAMME",
      text: "Led the 2026 revamp of the Unifi Developer Partnership programme and refreshed its digital purchase journey.",
      result: "Refreshed UDP purchase journey",
      image: "images/achievements/udp-program-revamp.png"
    },
    {
      title: "4 New UDP Projects",
      tag: "2026 DELIVERY",
      text: "Successfully launched four new Unifi Developer Partnership projects in 2026.",
      result: "4 projects launched",
      image: "images/achievements/new-udp-projects.jpg"
    },
    {
      title: "Unifi eShop Experience",
      tag: "DIGITAL COMMERCE",
      text: "Business and performance insights improved the Devices and Postpaid purchase journey across Unifi eShop.",
      result: "Improved Devices + Postpaid journeys",
      image: "images/achievements/unifi-eshop-experience.jpg"
    },
    {
      title: "WhatsApp Integration",
      tag: "CUSTOMER ASSISTANCE",
      text: "Added direct agent assistance to reduce friction during online registration and application journeys.",
      result: "Lower-friction assisted journeys",
      image: "images/achievements/whatsapp-integration.jpg"
    },
    {
      title: "Operational Excellence & Growth",
      tag: "OPERATIONS",
      text: "Strengthened productivity, customer lifecycle management, retention and fallout reduction through data-driven process improvement.",
      result: "Productivity + retention improvements",
      image: "images/achievements/operational-excellence.jpg"
    },
    {
      title: "iJoin Journey Revamp",
      tag: "JOURNEY OPTIMISATION",
      text: "Product-owned journey revamp focused on stakeholder delivery timelines and reducing customer drop-off before completion.",
      result: "Focused on reducing drop-off",
      image: "images/achievements/ijoin-journey-revamp.jpg"
    },
    {
      title: "Unifi TV Journey Revamp",
      tag: "DIGITAL EXPERIENCE",
      text: "Led the iDiscovery and purchase journey revamp to simplify navigation, improve content clarity and create a smoother purchase experience.",
      result: "Smoother Unifi TV purchase journey",
      image: "images/achievements/unifi-tv-journey-revamp.png"
    },
    {
      title: "FIFA World Cup 2026",
      tag: "CAMPAIGN EXPERIENCE",
      text: "Delivered the FIFA World Cup 2026 microsite in June to support campaign objectives through a dedicated digital experience.",
      result: "Dedicated campaign microsite",
      image: "images/achievements/fifa-world-cup-2026.jpg"
    },
    {
      title: "SEO & Organic Growth",
      tag: "ORGANIC PERFORMANCE",
      text: "Ongoing Unifi Portal SEO optimisation in 2025/2026 improved organic visibility and contributed to growth in organic traffic.",
      result: "Improved organic visibility",
      image: "images/achievements/seo-organic-growth.jpg"
    },
    {
      title: "Smarthome +200%",
      tag: "CONVERSION IMPACT",
      text: "Targeted special deals through the iJoin intercept contributed to a 200% increase in Smarthome bundle sales in May.",
      result: "+200% Smarthome bundle sales",
      image: "images/achievements/smarthome-200.jpg"
    }
  ],


  /* -------------------------------------------------------------------
     BEHIND THE SCENES — the 6 polaroids next to "View our moments".
     Each polaroid slowly cycles through its photos; give it a single
     photo to keep it still. seconds = time each photo stays up.
     ------------------------------------------------------------------- */
  polaroids: [
    {
      seconds: 3,
      photos: [
        "images/scrapbook/chapter-01/01.jpg",
        "images/scrapbook/chapter-01/02.jpg",
        "images/scrapbook/chapter-01/03.jpg",
        "images/scrapbook/chapter-01/04.jpg",
        "images/scrapbook/chapter-01/05.jpg"
      ]
    },
    {
      seconds: 3.4,
      photos: [
        "images/scrapbook/chapter-02/01.jpg",
        "images/scrapbook/chapter-02/02.jpg",
        "images/scrapbook/chapter-04/02.jpg",
        "images/scrapbook/chapter-04/03.jpg",
        "images/scrapbook/chapter-02/03.jpg"
      ]
    },
    {
      photos: ["images/scrapbook/chapter-04/04.jpg"]
    },
    {
      seconds: 2.8,
      photos: [
        "images/scrapbook/chapter-02/04.jpg",
        "images/scrapbook/chapter-03/01.jpg",
        "images/scrapbook/chapter-03/02.jpg",
        "images/scrapbook/chapter-02/05.jpg",
        "images/scrapbook/chapter-03/04.jpg"
      ]
    },
    {
      seconds: 3.2,
      photos: [
        "images/scrapbook/chapter-03/03.jpg",
        "images/scrapbook/chapter-05/01.jpg",
        "images/scrapbook/chapter-04/01.jpg",
        "images/scrapbook/chapter-05/02.jpg"
      ]
    },
    {
      photos: ["images/scrapbook/chapter-05/03.jpg"]
    }
  ],


  /* -------------------------------------------------------------------
     SCRAPBOOK — "View our moments". One block per chapter (book spread).
     Each chapter holds 1 to 5 photos; the layout adapts to how many.
     Chapter numbers, page numbers and photo numbers are added for you.
     ------------------------------------------------------------------- */
  scrapbook: [
    {
      title: "Genting Trip",
      subtitle: "Welcome To Skyworlds!",
      photos: [
        { image: "images/scrapbook/chapter-01/01.jpg", caption: "Skyworlds yayyyy" },
        { image: "images/scrapbook/chapter-01/02.jpg", caption: "Title Group Photo" },
        { image: "images/scrapbook/chapter-01/03.jpg", caption: "Epic Voyage to Moonhaven" },
        { image: "images/scrapbook/chapter-01/04.jpg", caption: "Epic Voyage to Moonhaven" },
        { image: "images/scrapbook/chapter-01/05.jpg", caption: "Welcome to Skyworlds" }
      ]
    },
    {
      title: "Genting Trip",
      subtitle: "Cable Car",
      photos: [
        { image: "images/scrapbook/chapter-02/01.jpg", caption: "Cable Car" },
        { image: "images/scrapbook/chapter-02/02.jpg", caption: "Cable Car" },
        { image: "images/scrapbook/chapter-02/03.jpg", caption: "Cable Car" },
        { image: "images/scrapbook/chapter-02/04.jpg", caption: "Cable Car" },
        { image: "images/scrapbook/chapter-02/05.jpg", caption: "Cable Car" }
      ]
    },
    {
      title: "Genting Trip",
      subtitle: "Resort World Genting",
      photos: [
        { image: "images/scrapbook/chapter-03/01.jpg", caption: "Invasion of the Planet of the Apes" },
        { image: "images/scrapbook/chapter-03/02.jpg", caption: "Central Park" },
        { image: "images/scrapbook/chapter-03/03.jpg", caption: "Lining up for a ride" },
        { image: "images/scrapbook/chapter-03/04.jpg", caption: "Unifi Store at Genting Mall" }
      ]
    },
    {
      title: "Events",
      subtitle: "4 photos",
      photos: [
        { image: "images/scrapbook/chapter-04/01.jpg", caption: "Fifa World Cup Opening" },
        { image: "images/scrapbook/chapter-04/02.jpg", caption: "GBM Team Building" },
        { image: "images/scrapbook/chapter-04/03.jpg", caption: "GBM Team Building" },
        { image: "images/scrapbook/chapter-04/04.jpg", caption: "Unifi Sport Day!!" }
      ]
    },
    {
      title: "Luncheon",
      subtitle: "3 photos",
      photos: [
        { image: "images/scrapbook/chapter-05/01.jpg", caption: "Luncheon Time" },
        { image: "images/scrapbook/chapter-05/02.jpg", caption: "Luncheon Time" },
        { image: "images/scrapbook/chapter-05/03.jpg", caption: "Luncheon Time" }
      ]
    },
    {
      title: "Lets Meet offline",
      subtitle: "4 photos",
      photos: [
        { image: "images/scrapbook/chapter-06/01.jpg", caption: "Group Photo Brand, Marketing & Digital" },
        { image: "images/scrapbook/chapter-06/02.jpg", caption: "Group Photo" },
        { image: "images/scrapbook/chapter-06/03.jpg", caption: "Sisters" },
        { image: "images/scrapbook/chapter-06/04.jpg", caption: "Ohana" },
        { image: "images/scrapbook/chapter-06/05.jpg", caption: "Smileee" }
      ]
    }
  ]

};
