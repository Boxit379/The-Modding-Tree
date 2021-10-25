addLayer("t", {
    name: "▲", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "▲", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
      unlocked: true,
		points: new Decimal(0),
    }},
    color: "#5e81ac",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "▲", // Name of prestige currency
    baseResource: "⬤", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
      mult = new Decimal(1)
      if (hasUpgrade('t', 21)) mult = mult.times(upgradeEffect('t', 21))
      return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
      return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
      {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
      11: {
        title: "More ⬤",
        description: "Double ⬤ gain",
        cost: new Decimal(1),
      },
      12: {
        title: "Even More ⬤",
        description: "Increase ⬤ gain based on ▲",
        cost: new Decimal(3),
        effect() {
          return player[this.layer].points.add(1).pow(0.5)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
      },
      21: {
        title: "More ▲",
        description: "Increase ▲ gain based on ⬤",
        cost: new Decimal(10),
        effect() {
          return player.points.add(1).pow(0.15)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
      },
    },
    layerShown(){return true}
})
addLayer("■", {
    name: "■", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "■", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(100), // Can be a function that takes requirement increases into account
    resource: "■", // Name of prestige currency
    baseResource: "⬤", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
