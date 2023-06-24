import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import { useIntl } from 'umi';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '王鸿颉出品',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      // style={{ height: '0px' }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'github',
          title: <><GithubOutlined /> 阿颉的github</>,
          href: 'https://github.com/XCGB/user-center-front-',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
