import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { ItemList } from 'widgets/item-list';

import { usePageSize } from 'features/item-list/hook';
import { GetItemsParams } from 'features/item-list/lib/api';
import { Pagination } from 'features/item-list/ui';

import { DeviceTypeProps } from 'shared/lib';
import { useDeviceTypeStore } from 'shared/store';

type Page = GetItemsParams['page'];
type Search = GetItemsParams['search'];
type Order = GetItemsParams['order'];

export function ItemListPage() {
  const [page, setPage] = useState<Page>(1);
  const [search, setSearch] = useState<Search>('');
  const [order, setOrder] = useState<Order>('recent');

  const deviceType = useDeviceTypeStore((state) => state.deviceType);

  const allItemsPageSize = usePageSize('all');
  const bestItemsPageSize = usePageSize('best');
  useEffect(() => {
    setSearch('');
  }, []);

  return (
    <ListWrapper $deviceType={deviceType}>
      <ItemList
        type='best'
        page={1}
        pageSize={bestItemsPageSize}
        order='favorite'
        search={search}
      />
      <ItemList
        type='all'
        page={page}
        pageSize={allItemsPageSize}
        order={order}
        setOrder={setOrder}
        search={search}
      />
      <Pagination type='all' page={page} setPage={setPage} />
    </ListWrapper>
  );
}

const ListWrapper = styled.div<DeviceTypeProps>`
  display: flex;
  flex-direction: column;
  margin-top: ${({ $deviceType }) => ($deviceType === 'mobile' ? '87px' : '94px')};
  row-gap: ${({ $deviceType }) => ($deviceType === 'mobile' ? '24px' : '40px')};
`;
