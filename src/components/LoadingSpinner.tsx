import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface LoadingSpinnerProps {
  tip?: string;
  fullScreen?: boolean;
}

export const LoadingSpinner = ({ tip = 'Loading...', fullScreen = false }: LoadingSpinnerProps) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const spinner = (
    <Spin
      indicator={antIcon}
      tip={tip}
      size="large"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      }}
    />
  );

  if (fullScreen) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.9)',
          zIndex: 1000,
        }}
      >
        {spinner}
      </div>
    );
  }

  return spinner;
};
