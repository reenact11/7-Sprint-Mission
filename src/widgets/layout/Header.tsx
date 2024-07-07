import styled from 'styled-components';

import { NavigationLink } from 'widgets/layout';

import { DeviceTypeProps } from 'shared/lib';
import { useDeviceTypeStore } from 'shared/store';

export function Header() {
  const deviceType = useDeviceTypeStore((state) => state.deviceType);
  console.log('deviceType:', deviceType);
  return (
    <HeaderWrapper $deviceType={deviceType}>
      <Container $deviceType={deviceType}>
        <h1>
          <NavigationLink href='/' text='판다마켓' type='home' $deviceType={deviceType} />
        </h1>
        <Wrapper $deviceType={deviceType}>
          <NavigationLink href='/freeboard' text='자유게시판' type='nav' $deviceType={deviceType} />
          <NavigationLink href='/items' text='중고마켓' type='nav' $deviceType={deviceType} />
        </Wrapper>
      </Container>
      <NavigationLink href='/login' text='로그인' type='login' $deviceType={deviceType} />
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header<DeviceTypeProps>`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  width: 100%;
  top: 0;
  left: 0;
  background: #fff;
  border-bottom: 1px solid #dfdfdf;
  z-index: 2;
  padding: ${({ $deviceType }) => {
    if ($deviceType === 'desktop') return '0 200px';
    if ($deviceType === 'tablet') return '0 34px 0 24px';
    if ($deviceType === 'mobile') return '0 16px';
  }};
`;

const Container = styled.div<DeviceTypeProps>`
  display: flex;
  align-items: center;
  column-gap: ${({ $deviceType }) => {
    if ($deviceType === 'desktop') return '32px;';
    if ($deviceType === 'tablet') return '20px;';
    if ($deviceType === 'mobile') return '16px';
  }};
`;

const Wrapper = styled.div<DeviceTypeProps>`
  display: flex;
  justify-content: space-between;
  column-gap: ${({ $deviceType }) => ($deviceType === 'mobile' ? '8px' : '39px;')};
`;
