import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';
import { DonateButton } from '@/components/donate-button';

export function baseOptions(): BaseLayoutProps {
  const hasGithub = Boolean(gitConfig.user && gitConfig.repo);

  return {
    nav: {
      title: appName,
    },
    links: [
      {
        text: 'Docs',
        url: '/docs',
      },
      {
        type: 'custom',
        secondary: true,
        children: <DonateButton size="sm" variant="gray" />,
      },
    ],
    ...(hasGithub
      ? { githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}` }
      : {}),
  };
}
