import styled from 'styled-components';

import { ItemTypeName } from 'widgets/item-list';

import { GetItemsParams } from 'features/item-list/lib/api';
import { DropDown } from 'features/item-list/ui';

import { DeviceTypeProps } from 'shared/lib';
import { useDeviceTypeStore } from 'shared/store';

import SearchIcon from '/images/ic_search.svg';

export type Order = GetItemsParams['order'];
export interface ItemToolbarProps {
  order: Order;
  setOrder?: (order: Order) => void;
}

export function ItemToolbar({ order, setOrder }: ItemToolbarProps) {
  const deviceType = useDeviceTypeStore((state) => state.deviceType);
  const isMobile = deviceType === 'mobile';

  return (
    <ItemToolbarWrapper $deviceType={deviceType}>
      {!isMobile ? (
        <>
          <SearchItemInput $deviceType={deviceType} placeholder='검색할 상품을 입력해주세요' />
          <MoveAddItem href='/additem'>상품 등록하기</MoveAddItem>
          <SortItem>
            <DropDown order={order} setOrder={setOrder} />
          </SortItem>
        </>
      ) : (
        <>
          <MobileToolBarWrapper>
            <ItemTypeName>판매 중인 상품</ItemTypeName>
            <MoveAddItem href='/additem'>상품 등록하기</MoveAddItem>
          </MobileToolBarWrapper>
          <SearchSortWrapper $deviceType={deviceType}>
            <SearchItemInput $deviceType={deviceType} placeholder='검색할 상품을 입력해주세요' />
            <SortItem>
              <DropDown order={order} setOrder={setOrder} />
            </SortItem>
          </SearchSortWrapper>
        </>
      )}
    </ItemToolbarWrapper>
  );
}

const ItemToolbarWrapper = styled.div<DeviceTypeProps>`
  display: flex;
  flex-direction: ${({ $deviceType }) => {
    if ($deviceType === 'mobile') return 'column';
  }};
  column-gap: ${({ $deviceType }) => {
    if ($deviceType !== 'mobile') return '12px';
  }};
  row-gap: ${({ $deviceType }) => {
    if ($deviceType === 'mobile') return '8px';
  }};
`;

const SearchItemInput = styled.input<DeviceTypeProps>`
    background-color: var(--gray100);
    background-image: url(${SearchIcon});
    background-position: 15px;
    background-repeat: no-repeat;
    font-size: 16px;
    line-height: 24px;
    border: none;
    border-radius: 12px;
    height: 42px;
    padding: 9px 20px 9px 44px;
    width: ${({ $deviceType }) => {
      if ($deviceType === 'desktop') return '325px';
      if ($deviceType === 'tablet') return '242px';
      if ($deviceType === 'mobile') return '294px';
    }}}
`;

const MoveAddItem = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 133px;
  height: 42px;
  background: var(--blue);
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  color: #fff;

  &:hover {
    background: #1967d6;
  }
`;

const SearchSortWrapper = styled.div<DeviceTypeProps>`
    display: flex;
    column-gap: ${({ $deviceType }) => {
      if ($deviceType === 'mobile') return '8px';
    }}}
`;

const SortItem = styled.div`
  display: flex;
  position: relative;
  padding: 0;
  border-radius: 12px;
  font-size: 16px;
`;

const MobileToolBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
