import { useState } from 'react';

import styled from 'styled-components';

import { ItemToolbarProps, Order } from 'features/item-list/ui';

import { DeviceTypeProps } from 'shared/lib';
import { useDeviceTypeStore } from 'shared/store';

import ArrowDownIcon from '/images/ic_arrow_down.svg';
import SortIcon from '/images/ic_sort.svg';

export function DropDown({ order, setOrder }: ItemToolbarProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const deviceType = useDeviceTypeStore((state) => state.deviceType);

  const isMobile = deviceType === 'mobile';
  const buttonText = order === 'recent' ? '최신순' : '좋아요순';
  const orderType: { type: Order; text: string }[] = [
    {
      type: 'recent',
      text: '최신순',
    },
    {
      type: 'favorite',
      text: '좋아요순',
    },
  ];

  const handleToggle = () => setIsOpen(!isOpen);
  const handleChangeOrder = (newOrder: Order) => {
    setOrder?.(newOrder);
    if (setIsOpen) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      <DropDownButton $deviceType={deviceType} onClick={handleToggle}>
        {!isMobile && <SortByItem>{buttonText}</SortByItem>}
        <DropDownIcon
          $deviceType={deviceType}
          src={isMobile ? SortIcon : ArrowDownIcon}
          alt='ArrowDownIcon'
        />
      </DropDownButton>

      {isOpen && (
        <DropDownMenu>
          {orderType.map((item) => (
            <DropDownItem key={item.type} onClick={() => handleChangeOrder(item.type)}>
              {item.text}
            </DropDownItem>
          ))}
        </DropDownMenu>
      )}
    </>
  );
}

const DropDownButton = styled.button<DeviceTypeProps>`
  display: flex;
  align-items: center;
  gap: 24px;
  border-radius: 12px;
  border: 1px solid var(--gray200);
  background-color: #fff;
  font-size: 16px;
  padding: ${({ $deviceType }) => ($deviceType === 'mobile' ? '0 9px' : '0 20px')};
`;

const DropDownIcon = styled.img<DeviceTypeProps>`
  width: 24px;
  height: 24px;
`;

const SortByItem = styled.span`
  font-size: 16px;
  line-height: 24px;
`;

const DropDownMenu = styled.ul`
  position: absolute;
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 0;
  background: white;
  text-align: center;
  border: 1px solid var(--gray200);
  border-radius: 12px;
  top: 46px;
  right: 0;
  width: 130px;
  z-index: 1;
`;

const DropDownItem = styled.li`
  padding: 12px 20px;
  border-bottom: 1px solid var(--gray200);
  &:last-child {
    border-bottom: none;
  }
  cursor: pointer;
`;
