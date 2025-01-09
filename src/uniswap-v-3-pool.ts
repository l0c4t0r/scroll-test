import { BigInt } from "@graphprotocol/graph-ts"
import {
  Swap as SwapEvent,
  UniswapV3Pool
} from "../generated/UniswapV3Pool/UniswapV3Pool"
import {
  Swap
} from "../generated/schema"


export function handleSwap(event: SwapEvent): void {
  let entity = new Swap(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.recipient = event.params.recipient
  entity.amount0 = event.params.amount0
  entity.amount1 = event.params.amount1
  entity.sqrtPriceX96 = event.params.sqrtPriceX96
  entity.liquidity = event.params.liquidity
  entity.tick = event.params.tick
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.reverted = false

  const contract = UniswapV3Pool.bind(event.address)

  entity.feeGrowthGlobal0X128 = contract.feeGrowthGlobal0X128()
  entity.feeGrowthGlobal1X128 = contract.feeGrowthGlobal1X128()

  // const try_0 = contract.try_feeGrowthGlobal0X128()
  // if (try_0.reverted) {
  //   entity.reverted = true
  //   entity.feeGrowthGlobal0X128 = BigInt.fromI32(0)
  // } else {
  //   entity.feeGrowthGlobal0X128 = try_0.value
  // }

  // const try_1 = contract.try_feeGrowthGlobal1X128()
  // if (try_1.reverted) {
  //   entity.reverted = true
  //   entity.feeGrowthGlobal1X128 = BigInt.fromI32(0)
  // } else {
  //   entity.feeGrowthGlobal1X128 = try_1.value
  // }

  entity.save()
}
