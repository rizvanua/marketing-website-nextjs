export type CmsBlock =
  | {
      type: "hero";
      heading: string;
      subheading: string;
      ctaText: string;
      ctaHref: string;
      bannerImage?: string;
    }
  | {
      type: "featureGrid";
      title: string;
      items: {
        title: string;
        description: string;
        backgroundColor?: string;
      }[];
    }
  | {
      type: "testimonial";
      quote: string;
      author: string;
      role?: string;
    }
  | {
      type: "ctaBanner";
      text: string;
      ctaText: string;
      ctaHref: string;
    }
  | {
      type: "article";
      title: string;
      author?: string;
      publishDate?: string;
      content: string;
    };

export type CmsPage = {
  slug: string;
  seo: {
    title: string;
    description: string;
    canonical?: string;
  };
  blocks: CmsBlock[];
};

export type CmsSiteData = {
  site: {
    name: string;
    logoUrl?: string;
    logoAltText?: string;
    navigation: {
      label: string;
      href: string;
    }[];
  };
  pages: {
    home: CmsPage;
    features: CmsPage;
    contact: {
      slug: string;
      seo: CmsPage["seo"];
      title: string;
      contactEmail: string;
      emailLabel: string;
      description: string;
    };
  };
};

const MOCK_DATA: CmsSiteData = {
  site: {
    name: "Guesty",
    logoUrl: "/assets/guesty-logo.svg",
    logoAltText: "Guesty Logo",
    navigation: [
      { label: "Home", href: "/" },
      { label: "Features", href: "/features" },
      { label: "Contact", href: "/contact" },
    ],
  },
  pages: {
    home: {
      slug: "/",
      seo: {
        title: "Guesty | Property Management Platform",
        description:
          "Guesty helps property managers automate operations and grow their business.",
      },
      blocks: [
        {
          type: "hero",
          heading: "Manage more properties. With less work.",
          subheading:
            "Guesty helps property managers automate workflows and scale operations.",
          ctaText: "Request a demo",
          bannerImage: "/assets/hero-banner.webp",
          ctaHref: "/contact",
        },
        {
          type: "featureGrid",
          title: "Built for Growth",
          items: [
            {
              title: "Automation",
              description:
                "Reduce manual work with automated workflows across channels.",
              backgroundColor: "#e3f2fd",
            },
            {
              title: "Insights",
              description:
                "Track performance and make data-driven decisions.",
              backgroundColor: "#f3e5f5",
            },
            {
              title: "Integrations",
              description:
                "Connect your PMS, CRM, analytics, and more.",
              backgroundColor: "#e8f5e9",
            },
          ],
        },
        {
          type: "testimonial",
          quote: "Guesty helped us scale our portfolio without scaling our workload.",
          author: "Alex Morgan",
          role: "Operations Manager",
        },
      ],
    },
    features: {
      slug: "/features",
      seo: {
        title: "Guesty Features | Built for Property Managers",
        description: "Explore Guesty's automation, insights, and integrations.",
      },
      blocks: [
        {
          type: "featureGrid",
          title: "Core Features",
          items: [
            {
              title: "Channel Management",
              description: "Manage listings across channels from one place.",
              backgroundColor: "#fff3e0",
            },
            {
              title: "Automation Rules",
              description: "Automate messages, tasks, and pricing.",
              backgroundColor: "#fce4ec",
            },
            {
              title: "Reporting",
              description: "Understand performance across properties and time.",
              backgroundColor: "#e0f2f1",
            },
          ],
        },
        {
          type: "article",
          title: "How Property Managers Scale Operations with Automation",
          author: "Sarah Chen",
          publishDate: "2024-01-15",
          content: "Property management has evolved significantly with the introduction of automation tools. Leading property managers are now able to handle portfolios 3x larger than before, without proportionally increasing their team size.\n\nThe key is strategic automation of repetitive tasks like guest communication, pricing updates, and channel synchronization. By automating these workflows, property managers can focus on what truly matters: guest experience and business growth.\n\nOur platform enables this transformation through intelligent rule-based automation that adapts to your business needs.",
        },
        {
          type: "ctaBanner",
          text: "Ready to see Guesty in action?",
          ctaText: "Contact sales",
          ctaHref: "/contact",
        },
      ],
    },
    contact: {
      slug: "/contact",
      seo: {
        title: "Contact Guesty",
        description: "Get in touch with the Guesty team to learn more.",
      },
      title: "Contact Us",
      contactEmail: "sales@guesty.com",
      emailLabel: "Email:",
      description:
        "Interested in learning how Guesty can help your business? Contact us.",
    },
  },
};

export async function fetchCmsData(): Promise<CmsSiteData> {
  // Simulates CMS latency
  await new Promise((r) => setTimeout(r, 200));
  return MOCK_DATA;
}

