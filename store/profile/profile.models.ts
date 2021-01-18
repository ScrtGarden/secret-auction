import { Action, Computed } from 'easy-peasy'

import { CombinedAuctionInfo } from '../../interfaces'

export interface ProfileState {
  auctions: CombinedAuctionInfo[]
}

export interface ProfileActions {
  setAuctions: Action<ProfileModel, CombinedAuctionInfo[]>
  updateAuction: Action<ProfileModel, Partial<CombinedAuctionInfo>>
}

export interface ProfileComputators {
  filterAuctions: Computed<
    ProfileModel,
    (filters: any) => CombinedAuctionInfo[]
  >
  auctionById: Computed<
    ProfileModel,
    (address: string) => CombinedAuctionInfo | undefined
  >
}

export interface ProfileModel
  extends ProfileState,
    ProfileActions,
    ProfileComputators {}
