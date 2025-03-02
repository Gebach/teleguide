import { useEffect, useState } from 'react'
import { ConfigProvider, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react-lite'
import channelsStore from './shared/store/ChannelsStore'
import Container from './shared/ui/Container/Container'
import { ChannelSelect } from './widgets/ChannelSelect/ChannelSelect'
import BroadcastList from './widgets/BroadcastList/BroadcastList'
import TabsComponent from './widgets/TabsComponent/TabsComponent'

const App = observer(() => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  const { getChannels, broadcast, isChannelsLoading } = channelsStore

  useEffect(() => {
    getChannels()
  }, [])

  return isChannelsLoading ? (
    <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
  ) : (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            itemActiveColor: '#f97316',
            inkBarColor: '#f97316',
            itemSelectedColor: '#f97316',
          },
        },
      }}
    >
      <Container classname="max-w-xl m-auto max-h-screen h-full py-12 relative mt-20">
        <div className="fixed top-0 left-0 w-full bg-white z-10 pt-6">
          <div className="max-w-xl w-full m-auto">
            <ChannelSelect />
            <TabsComponent onChangeAction={setSelectedDate} items={broadcast} />
          </div>
        </div>
        <BroadcastList selectedDate={selectedDate} items={broadcast} />
      </Container>
    </ConfigProvider>
  )
})
export default App
