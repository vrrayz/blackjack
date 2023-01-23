export const dealerSimulation = () => {
    const hitStandChance = ['hit','stand']
    return hitStandChance[Math.floor(Math.random() * hitStandChance.length)]
    // further dealer simulations can be done here.. For now this is just the basic 50-50 chance needed :)
}