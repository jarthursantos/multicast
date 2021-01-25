export interface HomeScreenContextHandles {
  isLoading: boolean

  currentAccompanimentTab: AccompanimentTabs
  changeAccompanimentTab(tab: AccompanimentTabs): void

  currentScheduleTab: ScheduleTabs
  changeScheduleTab(tab: ScheduleTabs): void

  currentStockNotificationTab: StockNotificationTabs
  changeStockNotificationTab(tab: StockNotificationTabs): void

  currentRepresentativeTab: RepresentativeTabs
  changeRepresentativeTab(tab: RepresentativeTabs): void
}

export enum HomeScreenTabs {
  ACCOMPANIMENTS = 'ACCOMPANIMENTS',
  SCHEDULES = 'SCHEDULES',
  BILLS_TO_PAY = 'BILLS_TO_PAY',
  STOCK_NOTIFICATIONS = 'STOCK_NOTIFICATIONS',
  REPRESENTATIVES = 'REPRESENTATIVES',
  PURCHASES_RESUME = 'PURCHASES_RESUME',
  REVENUES = 'REVENUES',
  STOCK_POSITION = 'STOCK_POSITION',
  SALES_BY_PROVIDER = 'SALES_BY_PROVIDER'
}

export enum AccompanimentTabs {
  GENERAL_RESUME = 'GENERAL_RESUME',
  IN_PROGRESS = 'IN_PROGRESS',
  IN_RECEIVEMENT = 'IN_RECEIVEMENT'
}

export enum ScheduleTabs {
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH'
}

export enum StockNotificationTabs {
  ARRIVAL = 'ARRIVAL',
  RELEASE = 'RELEASE',
  FINISH = 'FINISH'
}

export enum RepresentativeTabs {
  ALL = 'ALL',
  REPRESENTATIVE = 'REPRESENTATIVE',
  BUYER = 'BUYER'
}
