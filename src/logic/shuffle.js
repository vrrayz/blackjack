import { ranks,suits } from "../data/card_data";

export const shuffleCard = () => {
    const newArray = []
    while (newArray.length < 52) {
        // Pick random suits and ranks
        const suit = suits[Math.floor(Math.random() * suits.length)]
        const rank = ranks[Math.floor(Math.random() * ranks.length)]

        // create an object with them and check if it already is in the shuffle to avoid repitition
        const newObj = {suit:suit,rank:rank, isHidden: true}
        const index = newArray.findIndex(i => {
            return i.suit === suit && i.rank === rank
        })
        if(index < 0){
            newArray.push(newObj)
        }
    }
    // console.log(newArray)
    return newArray
} 