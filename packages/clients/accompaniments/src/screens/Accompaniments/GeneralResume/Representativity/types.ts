import { InProgressTabs } from '../../InProgress/types'

export interface RepresentativityContextHandles {
  countData: number[]
  amountData: number[]
  deliveredData: number[]
  changeCurrentInProgressTab(tab: InProgressTabs): void
}
