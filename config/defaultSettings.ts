import { Settings as LayoutSettings } from '@ant-design/pro-components';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '常大空谷',
  pwa: false,
  logo: 'https://teaching-project-web-tlias.oss-cn-beijing.aliyuncs.com/image/Logo.png',
  iconfontUrl: '',
};

export default Settings;
