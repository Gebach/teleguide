import { Tabs } from 'antd'

function DateTabs() {
  return (
    <Tabs
      defaultActiveKey="1"
      tabPosition="top"
      style={{ height: 220 }}
      items={Array.from({ length: 30 }, (_, i) => {
        const id = String(i)
        return {
          label: `Tab-${id}`,
          key: id,
          disabled: i === 28,
          children: `Content of tab ${id}`,
        }
      })}
    />
  )
}

export default DateTabs
