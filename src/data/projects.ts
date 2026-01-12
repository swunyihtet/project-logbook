export type ProjectStatus = 'Production' | 'UAT' | 'POC';

export interface Project {
  id: string;
  title: string;
  year: number;
  status: ProjectStatus;
  role: string;
  techStack: string[];
  category: string;
  problem: string[];
  solution: string[];
  impact: string[];
}

export const projects: Project[] = [
  {
    id: 'cloud-migration-program',
    title: 'Enterprise Cloud Migration Program',
    year: 2024,
    status: 'Production',
    role: 'Program Lead & Technical PM',
    techStack: ['AWS', 'Terraform', 'Jenkins', 'Kubernetes', 'PostgreSQL', 'DataDog'],
    category: 'Infrastructure',
    problem: [
      'Legacy on-premise infrastructure with 99.2% uptime causing $2M+ annual maintenance costs',
      'Manual deployment processes averaging 4-6 hours per release with high failure rates'
    ],
    solution: [
      'Orchestrated phased migration of 47 critical applications to AWS over 18 months',
      'Implemented IaC with Terraform reducing provisioning time from weeks to hours',
      'Established CI/CD pipelines with automated testing gates and rollback capabilities'
    ],
    impact: [
      'Reduced infrastructure costs by 34% ($680K annual savings)',
      'Achieved 99.95% uptime post-migration',
      'Deployment frequency increased from bi-weekly to daily releases'
    ]
  },
  {
    id: 'sso-implementation',
    title: 'Enterprise SSO & Identity Management',
    year: 2023,
    status: 'Production',
    role: 'Technical Project Manager',
    techStack: ['Okta', 'Azure AD', 'SAML 2.0', 'OAuth 2.0', 'SCIM', 'Python'],
    category: 'Security',
    problem: [
      'Fragmented authentication across 23 internal applications with inconsistent security policies',
      'Average 12 password reset tickets per day consuming helpdesk resources'
    ],
    solution: [
      'Led cross-functional team of 8 to implement Okta-based SSO federation',
      'Designed phased rollout strategy with pilot groups to minimize business disruption',
      'Automated user provisioning/deprovisioning via SCIM integration with HR systems'
    ],
    impact: [
      'Reduced authentication-related tickets by 78%',
      'Decreased onboarding time from 3 days to 2 hours',
      'Zero security incidents related to credential management post-implementation'
    ]
  },
  {
    id: 'disaster-recovery',
    title: 'Multi-Region Disaster Recovery Platform',
    year: 2024,
    status: 'UAT',
    role: 'DR Architect & PM',
    techStack: ['AWS', 'Route 53', 'RDS Multi-AZ', 'S3 Cross-Region', 'CloudFormation', 'PagerDuty'],
    category: 'Infrastructure',
    problem: [
      'RTO of 24+ hours for critical systems with no documented recovery procedures',
      'Untested backup systems with unknown data integrity status'
    ],
    solution: [
      'Architected active-passive DR topology across us-east-1 and us-west-2',
      'Implemented automated failover with health checks and DNS-based routing',
      'Established quarterly DR drills with documented runbooks and success metrics'
    ],
    impact: [
      'Reduced RTO from 24 hours to 15 minutes',
      'RPO improved from 24 hours to 5 minutes for critical data',
      '100% success rate across 4 quarterly DR tests'
    ]
  },
  {
    id: 'observability-platform',
    title: 'Unified Observability Platform',
    year: 2023,
    status: 'Production',
    role: 'Project Lead',
    techStack: ['Grafana', 'Prometheus', 'Loki', 'OpenTelemetry', 'Jaeger', 'Slack'],
    category: 'DevOps',
    problem: [
      'MTTR averaging 4 hours due to siloed monitoring tools and lack of correlation',
      'Alert fatigue with 200+ daily alerts, <15% actionable'
    ],
    solution: [
      'Consolidated 5 monitoring tools into unified Grafana-based observability stack',
      'Implemented distributed tracing with OpenTelemetry across microservices',
      'Designed intelligent alerting with escalation policies and runbook automation'
    ],
    impact: [
      'Reduced MTTR by 65% (4 hours → 84 minutes)',
      'Alert volume decreased 82% while maintaining coverage',
      'Engineering team satisfaction with tooling increased from 3.2 to 4.6/5'
    ]
  },
  {
    id: 'api-gateway-poc',
    title: 'API Gateway Modernization',
    year: 2024,
    status: 'POC',
    role: 'Technical Lead',
    techStack: ['Kong', 'GraphQL', 'Redis', 'Docker', 'OpenAPI', 'K6'],
    category: 'Architecture',
    problem: [
      'Direct service-to-service communication creating tight coupling and security gaps',
      'No centralized rate limiting or authentication causing inconsistent API behavior'
    ],
    solution: [
      'Evaluating Kong Gateway as centralized API management layer',
      'Prototyping GraphQL federation for unified data access patterns',
      'Implementing rate limiting, authentication, and request transformation plugins'
    ],
    impact: [
      'POC demonstrated 40% reduction in inter-service latency',
      'Projected security improvement with centralized auth enforcement',
      'Go/no-go decision scheduled for Q1 2025 with full rollout planned for Q2'
    ]
  }
];

export const years = [...new Set(projects.map(p => p.year))].sort((a, b) => b - a);
export const statuses: ProjectStatus[] = ['Production', 'UAT', 'POC'];
export const categories = [...new Set(projects.map(p => p.category))];
export const techStacks = [...new Set(projects.flatMap(p => p.techStack))].sort();
