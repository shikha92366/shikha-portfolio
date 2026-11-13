export const ALL_PROJECTS_QUERY = `
  *[_type == "project"] | order(orderRank asc, order asc, _createdAt asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    domain,
    category,
    techStack,
    role,
    timeline,
    featured,
    status,
    awards,
    team,
    coverImage,
    overview,
    architecture,
    hardwareDetails,
    implementation,
    results,
    challenges,
    gallery,
    documents[] {
      _key,
      label,
      type,
      "fileUrl": file.asset->url,
      url
    },
    githubUrl,
    demoUrl,
    videoUrl,
    order
  }
`;

export const FEATURED_PROJECTS_QUERY = `
  *[_type == "project" && featured == true] | order(orderRank asc, order asc, _createdAt asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    domain,
    category,
    techStack,
    role,
    timeline,
    featured,
    status,
    awards,
    team,
    coverImage,
    overview,
    architecture,
    hardwareDetails,
    implementation,
    results,
    challenges,
    gallery,
    documents[] {
      _key,
      label,
      type,
      "fileUrl": file.asset->url,
      url
    },
    githubUrl,
    demoUrl,
    videoUrl,
    order
  }
`;

export const PROJECT_BY_SLUG_QUERY = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    domain,
    category,
    techStack,
    role,
    timeline,
    featured,
    status,
    awards,
    team,
    coverImage,
    overview,
    architecture,
    hardwareDetails,
    implementation,
    results,
    challenges,
    gallery,
    documents[] {
      _key,
      label,
      type,
      "fileUrl": file.asset->url,
      url
    },
    githubUrl,
    demoUrl,
    videoUrl,
    order
  }
`;

export const ALL_EXPERIENCE_QUERY = `
  *[_type == "experience"] | order(orderRank asc, order asc, _createdAt asc) {
    _id,
    role,
    company,
    startDate,
    endDate,
    bullets,
    techStack,
    order
  }
`;

export const ALL_SKILLS_QUERY = `
  *[_type == "skill"] | order(orderRank asc, order asc, _createdAt asc) {
    _id,
    name,
    category,
    proficiency,
    order
  }
`;

export const ALL_ACHIEVEMENTS_QUERY = `
  *[_type == "achievement"] | order(orderRank asc, order asc, _createdAt asc) {
    _id,
    title,
    issuer,
    date,
    type,
    description,
    credentialUrl,
    order
  }
`;

export const PUBLIC_DOCUMENTATION_QUERY = `
  *[_type == "technicalDocument" && visibility == "public" && !(_id in path("drafts.**")) && !(_id in path("versions.**")) && (defined(file.asset) || defined(body))]
    | order(createdAt desc, _createdAt desc) {
      _id,
      title,
      "slug": slug.current,
      description,
      "excerpt": pt::text(body),
      "hasArticle": defined(body),
      seoTitle,
      metaDescription,
      tags,
      "category": category->title,
      "project": project->{title, "slug": slug.current},
      "file": file.asset->{url, originalFilename, mimeType},
      attachments[]{_key, label, caption, "url": asset->url, "filename": asset->originalFilename}
    }
`;

export const PUBLIC_DOCUMENTATION_ARTICLE_QUERY = `
  *[_type == "technicalDocument" && visibility == "public" && slug.current == $slug && !(_id in path("drafts.**")) && !(_id in path("versions.**"))][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    seoTitle,
    metaDescription,
    body,
    tags,
    "category": category->title,
    "project": project->{title, "slug": slug.current},
    attachments[]{_key, label, caption, "url": asset->url, "filename": asset->originalFilename}
  }
`;

export const PROFILE_QUERY = `
  *[_id == "profile"][0] {
    _id,
    name,
    greeting,
    title,
    intro,
    location,
    email,
    photo,
    currentTechnologies,
    socials[] {
      _key,
      label,
      url,
      icon
    },
    education[] {
      _key,
      school,
      degree,
      period,
      score
    },
    sectionLabels
  }
`;

export const SITE_SETTINGS_QUERY = `
  *[_id == "siteSettings"][0] {
    _id,
    title,
    description,
    ogImage,
    navLabels
  }
`;

export const RESUME_QUERY = `
  *[_id == "resume"][0] {
    _id,
    title,
    lastUpdated,
    "fileUrl": resumeFile.asset->url
  }
`;
