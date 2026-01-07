export type CmsBlock =
  | {
      type: "hero";
      heading: string;
      subheading: string;
      ctaText: string;
      ctaHref: string;
    }
  | {
      type: "featureGrid";
      title: string;
      items: {
        title: string;
        description: string;
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
      contactEmail: string;
      description: string;
    };
  };
};

const MOCK_DATA: CmsSiteData = {
  site: {
    name: "Guesty",
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
            },
            {
              title: "Insights",
              description:
                "Track performance and make data-driven decisions.",
            },
            {
              title: "Integrations",
              description:
                "Connect your PMS, CRM, analytics, and more.",
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
            },
            {
              title: "Automation Rules",
              description: "Automate messages, tasks, and pricing.",
            },
            {
              title: "Reporting",
              description: "Understand performance across properties and time.",
            },
          ],
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
      contactEmail: "sales@guesty.com",
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

