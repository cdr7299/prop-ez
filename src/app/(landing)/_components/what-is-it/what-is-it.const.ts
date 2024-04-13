import { Description } from "@radix-ui/react-dialog";
import { Data } from "./what.types";
import { Features } from "./what.types";

const data: Data[] = [
  {
    title: "Enhancing omnichannel communication",
    description: ` to effectively capture inquiries from various channels`,
  },
  {
    title: "Seamless Drip Campaigns",
    description: `for implementation of automated and continuous email outreach strategies that smoothly transition between stages or messages, ensuring a cohesive and uninterrupted flow of communication with recipients over time.`,
  },
  {
    title: "Augmented Productivity via Integrations",
    description: `for enhancement of efficiency and effectiveness in tasks or workflows by incorporating external tools, systems, or APIs into the existing infrastructure`,
  },
  {
    title: "Streamlining Workflows",
    description: `Leveraging Third-Party Integrations and APIs for Enhanced Productivity and Efficiency`,
  },
  {
    title: "Tailored Customization",
    description: `Adapting to the Distinct Processes and Needs of Real Estate Agents for Comprehensive Solutions`,
  },
  {
    title: "Empowering Direct Engagement",
    description: `Implementing Self-Service Portals to Facilitate Seamless Connections between Sellers, Buyers, and Your Business`,
  },
];

const features: Features[] = [
  {
    title: "Lead Lifecycle Management",
    description: `Streamline lead management processes by strategically capturing,
            monitoring, and cultivating leads throughout their journey within
            the Propez CRM, employing cutting-edge lead scoring, automated
            assignment, and nurturing protocols to drive conversions
            effectively.`,
    imageSrc: "/leadlifecyclemanagement.webp",
  },
  {
    title: "Workflow Automation",
    description: `Streamline operations and boost efficiency with automation features
            within the Propez CRM, automating repetitive tasks, notifications,
            reminders, and task allocations, minimizing manual intervention and
            maximizing productivity within the CRM ecosystem.`,
    imageSrc: "/workflowautomation.webp",
  },
  {
    title: "Automated Processes",
    description: `Execute captivating email campaigns with finesse within the Propez
            CRM, leveraging sophisticated automation tools to deliver tailored
            messages, newsletters, and drip campaigns directly from the CRM
            platform, enhancing communication and lead nurturing efforts.`,
    imageSrc: "/automatedprocesses.webp",
  },
  {
    title: "Task and Agenda Orchestration",
    description: `Masterfully orchestrate tasks, appointments, and events with precision within the Propez CRM, ensuring impeccable time management and follow-through on critical deadlines, all within the CRM ecosystem.`,
    imageSrc: "/task_agenda_orchestration.webp",
  },
  {
    title: "Document Repository",
    description: `Provide a robust repository for property-related documents, contracts, and communications within the Propez CRM, featuring advanced version control and secure sharing capabilities, ensuring easy access and organization of essential documents within the CRM ecosystem.`,
    imageSrc: "/document_repository.webp",
  },
  {
    title: "Easy invoices and bills",
    description: `PropEz CRM helps you complete your sales cycle by enabling your team to create and store quotes, invoices, price books, and bills in their accounts. Manage all your post-sales processes using powerful inventory management features, and share your quotes and invoices to prospects through custom email and invoice templates.`,
    imageSrc: "/bills.webp",
  },
  {
    title: "Insightful Analytics",
    description: `Unlock deep insights into performance metrics and market trends with powerful reporting and analytics tools within the Propez CRM, driving informed decision-making and optimizing business strategies within the CRM environment.`,
    imageSrc: "/insightful_analytics.webp",
  },
];

const benefitsofcrm: Data[] = [
  {
    title: " 300%",
    description: `Improvement in lead conversion rates`,
  },
  {
    title: " 41%",
    description: `Revenue increase per sales person.`,
  },
  {
    title: " 26%",
    description: ` Improvement in customer retention rates`,
  },
  {
    title: " 47%",
    description: ` Increase in customer satisfaction rates`,
  },
];

export { features };
export { data };
export { benefitsofcrm };
