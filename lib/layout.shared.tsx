import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';
import { DonateButton } from '@/components/donate-button';
import { FortLogo } from '@/components/fort-logo';

export function baseOptions(): BaseLayoutProps {
  const hasGithub = Boolean(gitConfig.user && gitConfig.repo);

  return {
    nav: {
      title: (
        <span className="inline-flex items-center gap-2 font-semibold tracking-tight">
          <FortLogo size={22} />
          <span>{appName}</span>
        </span>
      ),
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
