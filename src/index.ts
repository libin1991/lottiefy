/// <reference path="../typings/cocos2d/cocos2d-lib.d.ts" />
import { Layers, Assets } from '../typings/animation'
import { traverse } from './traverse'

export default function lottie(data: any, g: any) {
  const layers: { [id: string]: cc.Layer | cc.Sprite | cc.DrawNode } = {}

  // const container = new cc.LayerColor(cc.color(0, 0, 255, 100), 1080, 1920)
  const container = new cc.LayerColor(cc.color(0, 0, 0, 0), 1080, 1920)
  // container.setContentSize(100, 100)
  // container.ignoreAnchorPointForPosition(false)
  // container.setAnchorPoint(0.5, 0.5)

  // container.setPosition(0, cc.winSize.height)
  // container.setPosition(cc.winSize.width / 2, cc.winSize.height / 2)
  // container.setScale(0.4)
  // container.setPosition(500, 500)
  // window.g = globalLayer
  // container.setScale(cc.winSize.height / 1920)
  const containerId = 'xxxxx'
  layers[containerId] = container
  g.addChild(container)
  ;(window as any).c = container
  let ii = 0

  traverse(data, containerId, {
    createShape(
      id: string,
      parentId: string,
      x0: number,
      y0: number,
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      x3: number,
      y3: number
    ) {
      // console.log(arguments)
      const parentNode = this.getNode(parentId)
      const node = new cc.DrawNode()
      // setTimeout(() => {
      //   node.drawDots(
      //     [cc.p(x0, y0), cc.p(x1, y1), cc.p(x2, y2), cc.p(x3, y3)],
      //     10,
      //     cc.color(255, 0, 0, 255)
      //   )
      // }, ii * 1000)
      // ii++
      // node.drawCubicBezier(
      //   cc.p(x0, y0),
      //   cc.p(x1, y1),
      //   cc.p(x2, y2),
      //   cc.p(x3, y3),
      //   100,
      //   10,
      //   cc.color('#ff0')
      // )
      node.drawSegment(cc.p(x0, parentNode.height - y0), cc.p(x3, parentNode.height - y3), 10)
      layers[id] = node
      this.addChild(id, parentId)
      // console.log(node)
    },
    createLayer(id, width, height) {
      // layers[id] = new cc.LayerColor(cc.color(255, 255, 0, 40), width, height)
      // console.log(layers[id])
      layers[id] = new cc.LayerColor(cc.color(0, 0, 0, 0), width, height)
    },
    createSprite(id, name) {
      // layers[id] = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(name))
      layers[id] = new cc.Sprite(name)
    },
    setPosition(id, parentId, x, y) {
      // console.log(id, x, layers[parentId].height - y, layers[id])
      layers[id].setPosition(x, layers[parentId].height - y)
    },
    setContentSize(id, width, height) {
      layers[id].setContentSize(width, height)
    },
    setAnchorPoint(id, x, y) {
      // console.log(arguments)
      layers[id].ignoreAnchorPointForPosition(false)
      layers[id].setAnchorPoint(x, y)
    },
    moveTo(id, parentId, time, x, y) {
      // console.log(layers[parentId])
      layers[id].runAction(cc.moveTo(time, x, layers[parentId].height - y))
    },
    addChild(id, parentId, localZOrder) {
      // console.log(arguments)
      // layers[id].ignoreAnchorPointForPosition(false)
      layers[parentId].addChild(layers[id], localZOrder)
    },
    getNode(id) {
      return layers[id]
    },
  })
}
