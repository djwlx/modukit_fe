import React, { useEffect, useState } from 'react';
import { Table, Avatar, Button, Empty, Typography, Tag, Space, Input } from '@douyinfe/semi-ui';
import { IconClear, IconComment, IconDelete, IconTickCircle } from '@douyinfe/semi-icons';
import { IllustrationNoResult, IllustrationNoResultDark } from '@douyinfe/semi-illustrations';
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';
const { Text } = Typography;

const raw = [
  {
    key: '1',
    name: 'Semi Design 设计稿标题可能有点长这时候应该显示 Tooltip.fig',
    nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png',
    size: '2M',
    owner: '姜鹏志',
    status: 'success',
    updateTime: '2020-02-02 05:13',
    avatarBg: 'grey',
  },
  {
    key: '2',
    name: 'Semi Design 分享演示文稿',
    nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
    size: '2M',
    owner: '郝宣',
    status: 'pending',
    updateTime: '2020-01-17 05:31',
    avatarBg: 'red',
  },
  {
    key: '3',
    name: '设计文档',
    nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
    size: '34KB',
    status: 'wait',
    owner: 'Zoey Edwards',
    updateTime: '2020-01-26 11:01',
    avatarBg: 'light-blue',
  },
  {
    key: '4',
    name: 'Semi D2C 设计文档可能也有点长所以也会显示Tooltip',
    nameIconSrc: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png',
    size: '34KB',
    status: 'success',
    owner: '姜琪',
    updateTime: '2020-01-26 11:01',
    avatarBg: 'green',
  },
];

function TaskList() {
  const [dataSource, setData] = useState(raw);
  const [scrollHeight, setScrollHeight] = useState(500);

  const getAndSetHeight = () => {
    setScrollHeight(window.innerHeight - 60 - 60 - 38 - 32);
  };

  const removeRecord = key => {
    let newDataSource = [...dataSource];
    if (key != null) {
      let idx = newDataSource.findIndex(data => data.key === key);

      if (idx > -1) {
        newDataSource.splice(idx, 1);
        setData(newDataSource);
      }
    }
  };
  const resetData = () => {
    const newDataSource = [...raw];
    setData(newDataSource);
  };

  const columns: ColumnProps<any>[] = [
    {
      title: '标题',
      dataIndex: 'name',
      sorter: (a, b) => (a.size - b.size > 0 ? 1 : -1),
      onFilter: (value, record) => record.name.includes(value),

      renderFilterDropdown: props => {
        console.log('renderFilterDropdown', props);
        const { tempFilteredValue, setTempFilteredValue, confirm, clear, close } = props;

        const handleChange = value => {
          if (value) {
            setTempFilteredValue([value]);
          } else {
            setTempFilteredValue([]);
          }
        };

        return (
          <Space vertical align="start" style={{ padding: 8 }}>
            <Input value={tempFilteredValue[0]} onChange={handleChange} />
            <Space>
              <Button onClick={() => confirm({ closeDropdown: false })}>筛选后不关闭</Button>
              <Button onClick={() => clear({ closeDropdown: false })}>清除后不关闭</Button>
              <Button onClick={() => close()}>直接关闭</Button>
            </Space>
          </Space>
        );
      },
      width: 400,
      render: (text, record, index) => {
        return (
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar size="small" shape="square" src={record.nameIconSrc} style={{ marginRight: 12 }}></Avatar>
            {/* 宽度计算方式为单元格设置宽度 - 非文本内容宽度 */}
            <Text ellipsis={{ showTooltip: true }} style={{ width: 'calc(400px - 76px)' }}>
              {text}
            </Text>
          </span>
        );
      },
    },
    {
      title: '大小',
      dataIndex: 'size',
      width: 150,
    },
    {
      title: '交付状态',
      dataIndex: 'status',
      render: text => {
        const tagConfig = {
          success: { color: 'green', prefixIcon: <IconTickCircle />, text: '已交付' },
          pending: { color: 'pink', prefixIcon: <IconClear />, text: '已延期' },
          wait: { color: 'cyan', prefixIcon: <IconComment />, text: '待评审' },
        };
        const tagProps = tagConfig[text];
        return (
          <Tag shape="circle" {...tagProps} style={{ userSelect: 'text' }}>
            {tagProps.text}
          </Tag>
        );
      },
    },
    {
      title: '所有者',
      dataIndex: 'owner',
      width: 300,
      render: (text, record, index) => {
        return (
          <div>
            <Avatar size="small" color={record.avatarBg} style={{ marginRight: 4 }}>
              {typeof text === 'string' && text.slice(0, 1)}
            </Avatar>
            {text}
          </div>
        );
      },
    },
    {
      title: '更新日期',
      dataIndex: 'updateTime',
      width: 200,
    },
    {
      title: '',
      dataIndex: 'operate',
      render: (text, record) => (
        <Button icon={<IconDelete />} theme="borderless" onClick={() => removeRecord(record.key)} />
      ),
    },
  ];

  const empty = (
    <Empty image={<IllustrationNoResult />} darkModeImage={<IllustrationNoResultDark />} description={'无结果'} />
  );

  useEffect(() => {
    getAndSetHeight();
    window.addEventListener('resize', getAndSetHeight);
    return () => {
      window.removeEventListener('resize', getAndSetHeight);
    };
  }, []);

  return (
    <>
      <Table columns={columns} dataSource={dataSource} scroll={{ x: 'max-content', y: scrollHeight }} empty={empty} />
    </>
  );
}
export default TaskList;
