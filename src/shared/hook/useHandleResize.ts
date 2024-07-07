import { useEffect } from 'react';

import { debounce } from 'lodash-es';

import { useDeviceTypeStore } from 'shared/store';

// 상태 업데이트를 위한 리사이즈 핸들러
export const useHandleResize = () => {
  const setDeviceType = useDeviceTypeStore((state) => state.setDeviceType);

  // 디바운싱 적용
  useEffect(() => {
    const handleResize = debounce(() => {
      setDeviceType(window.innerWidth);
    }, 200);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setDeviceType]);
};
