import styled from 'styled-components';

import { useFetchItems } from 'features/item-list/hook';
import { GetItemsParams } from 'features/item-list/lib/api';
import { ItemToolbar } from 'features/item-list/ui';

import { DeviceTypeProps } from 'shared/lib';
import { useDeviceTypeStore } from 'shared/store';

import HeartIcon from '/images/ic_heart.svg';

export type Item = 'all' | 'best';

interface ItemTypeProps extends DeviceTypeProps {
  $type?: Item;
  children?: React.ReactNode;
}

interface ItemListProps extends GetItemsParams {
  type: Item;
  setOrder?: (order: GetItemsParams['order']) => void;
}

export function ItemList({ type, page, pageSize, order, setOrder, search }: ItemListProps) {
  const { items } = useFetchItems({ page, pageSize, order, search });
  const deviceType = useDeviceTypeStore((state) => state.deviceType);
  const getItemType = (type: Item) => {
    if (type === 'best') {
      return '베스트 상품';
    }
    return deviceType === 'desktop' ? '전체 상품' : '판매 중인 상품';
  };

  return (
    <ItemContainer $deviceType={deviceType}>
      <ItemWrapper>
        <ItemTypeName $type={type} $deviceType={deviceType}>
          {getItemType(type)}
        </ItemTypeName>
        {type === 'all' && <ItemToolbar order={order} setOrder={setOrder} />}
      </ItemWrapper>
      <ItemInfo $type={type} $deviceType={deviceType}>
        {items.map((item) => (
          <ItemCard key={item.id}>
            <ItemImage $type={type} $deviceType={deviceType} src={item.images[0]} alt={item.name} />
            <ItemName>{item.name}</ItemName>
            <ItemPrice>{item.price.toLocaleString()}원</ItemPrice>
            <FavoriteWrapper>
              <FavoriteIcon src={HeartIcon} />
              <FavoriteCount> {item.favoriteCount}</FavoriteCount>
            </FavoriteWrapper>
          </ItemCard>
        ))}
      </ItemInfo>
    </ItemContainer>
  );
}

const ItemContainer = styled.div<DeviceTypeProps>`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ $deviceType }) => {
    if ($deviceType === 'tablet') return '0 24px';
    if ($deviceType === 'mobile') return '0 16px';
  }};
`;

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ItemTypeName = styled.h2<ItemTypeProps>`
  font-size: 20px;
  line-height: 140%;
  display: ${({ $type, $deviceType }) => {
    if ($type === 'all') {
      if ($deviceType === 'mobile') return 'none';
    }
  }};
`;

const ItemInfo = styled.ul<ItemTypeProps>`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  row-gap: ${({ $type, $deviceType }) => {
    if ($type === 'all') {
      if ($deviceType === 'mobile') return '32px';
    }
    return '40px';
  }};
`;

const ItemCard = styled.li`
  display: flex;
  flex-direction: column;
  row-gap: 6px;
`;

const ItemImage = styled.img<ItemTypeProps>`
  width: ${({ $type, $deviceType }) => {
    if ($type === 'all') {
      if ($deviceType === 'mobile') {
        return '168px';
      }
      return '221px';
    }
    if ($type === 'best') {
      if ($deviceType === 'desktop') return '282px';
      if ($deviceType === 'tablet') return '336px';
      if ($deviceType === 'mobile') return '343px';
    }
  }};
  height: ${({ $type, $deviceType }) => {
    if ($type === 'all') {
      if ($deviceType === 'mobile') {
        return '168px';
      }
      return '221px';
    }
    if ($type === 'best') {
      if ($deviceType === 'desktop') return '282px';
      if ($deviceType === 'tablet') return '336px';
      if ($deviceType === 'mobile') return '343px';
    }
  }};
  border-radius: 16px;
  // box-shadow: 0 8px 24px #959da533;
`;

const ItemName = styled.p`
  padding-top: 10px;
  font-size: 14px;
  line-height: 16.71px;
`;

const ItemPrice = styled.p`
  font-size: 16px;
  font-weight: 700;
  line-height: 19.09px;
`;

const FavoriteWrapper = styled.div`
  display: flex;
  column-gap: 4px;
`;

const FavoriteIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const FavoriteCount = styled.p`
  font-size: 12px;
  line-height: 14.32px;
  color: var(--gray600);
`;
