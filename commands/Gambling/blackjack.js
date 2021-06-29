module.exports = {
    name: "Blackjack",
	alias: ["bj"],
	use: "-Blackjack [bet]",
	description: "Bet that you will win the blackjack",
	options: {ShowInHelp: true, Category: "Gambling"},
	run: async function(msg, client, disc, args){
        try{
            let bet = client.utils.suffixCheck(args[0])
            if(bet == "all") bet = await client.data.user.getBalance(client, msg.member);
            if(!bet || bet < 1) return client.eventEm.emit('InvalidInputAmount', msg);

            if(!await client.data.user.enoughMoney(client, msg.member, bet)) return

            client.data.user.addBalance(client, msg.member, -1*bet, "add");

            blackjack(msg, client, disc, bet, msg.member)
        }catch(e){
            client.eventEm.emit('CommandError', msg, this.name, args, e)
        }

    }
}

async function blackjack(ref, client, discord, bet, player, cards=[], dealerHand=[], playerHand=[], retVal="h"){
    if(!cards.length){
        cards = await generateDeck()
        dealerHand.push(cards.pop())
        playerHand.push(cards.pop())
    }

    if(retVal == "h") {
        playerHand.push(cards.pop())
        sendMessage(ref, client, discord, bet, player, cards, dealerHand, playerHand, false, (handToPoints(playerHand)>21))
    }else if(retVal == "s"){
        let dealerPoints = handToPoints(dealerHand)
        while(dealerPoints<17){
            let newCard = cards.pop()
            dealerHand.push(newCard)
            dealerPoints += handToPoints([newCard])
        }
        sendMessage(ref, client, discord, bet, player, cards, dealerHand, playerHand, (dealerPoints>21),(handToPoints(playerHand)>21), true)
    }
}

function sendMessage(ref, client, discord, bet, player, cards, dealerHand, playerHand, dealerBust = false, plrBust=false, finished = false){
    let embed = new discord.MessageEmbed();

    plrPoints = handToPoints(playerHand)
    dlrPoints = handToPoints(dealerHand)

    embed.setTitle(`${player.displayName}'s blackjack game`)
    embed.addField(`${player.displayName}'s hand`, `${getHand(playerHand)}\nTotal: ${plrPoints}`, true)
    embed.addField(`Dealers hand:`, `${getHand(dealerHand)}\nTotal: ${dlrPoints}`, true)

    if(plrBust&&dealerBust){
        embed.addField(`Draw!`, `You both went bust. You keep $${client.utils.numberWithCommas(bet, true)}`)
        client.data.user.addBalance(client, player, bet, "add")
    }
    else if((finished && (dlrPoints>plrPoints) && !dealerBust)|| plrBust) embed.addField(`Dealer won!`, `You lost $${client.utils.numberWithCommas(bet, true)}`)
    else if((finished && (plrPoints>dlrPoints) && !plrBust)|| dealerBust) {
        const winnings = Math.floor(bet*(Math.random()*(1.5-0.3)+0.3))
        embed.addField(`You won!`, `You earned $${client.utils.numberWithCommas(winnings, true)}`)
        client.data.user.addBalance(client, player, winnings+bet, "add")
    }
    else if(plrBust) embed.addField(`BUST`, `You went above 21!`)
    else if(dealerBust) embed.addField(`You won!`, )
    else if(plrPoints==dlrPoints && finished){
        embed.addField(`PUSH!`, `You got the same points as the dealer, you keep $${client.utils.numberWithCommas(bet, true)}`)
        client.data.user.addBalance(client, player, bet, "add")
    }
    else embed.addField(`\u200b\n:regional_indicator_h:  - Hit | :regional_indicator_s:  - Stand | :regional_indicator_d:  - Double`, "\u200b")

    const filter = (reaction, user) => {
        if(user.id != player.id) return;
        let val = ""
        if(reaction.emoji.name == client.s.emoji[7]) val = "h"// Hit
        else if(reaction.emoji.name == client.s.emoji[18]) val = "s"// Stand
        //else if(reaction.emoji.name == client.s.emoji[9]) val = "d" // Double
        else return;
        reaction.message.delete();
        blackjack(ref, client, discord, bet, player, cards, dealerHand, playerHand, val)
    }

    ref.channel.send(embed)
        .then(msg => {
            if(dealerBust || plrBust || finished) return;
            try {
                msg.awaitReactions(filter)
            }catch(e){console.log(1)}
            msg.react(client.s.emoji[7]);
            msg.react(client.s.emoji[18]);
            //msg.react(client.emoji[3]); Double
        })
}

const suits = ["spades", "diamonds", "clubs", "hearts"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10","J","Q","K",];

function generateDeck(){
    let deck = []
    for (let i = 0; i < suits.length; i++) {
        for (let x = 0; x < values.length; x++) {
            let card = {Value: values[x], Suit: suits[i]};
            deck.push(card);
        }
    }
    deck.sort(() => Math.random() - 0.5);
    return deck;
}

function handToPoints(hand=[]){
    let points = 0
    let ace = 0;
    let index = 0;
    for(card of hand){
        let value = Number(card.Value)
        if(isNaN(value)) value = (card.Value=="J"||card.Value=="Q"||card.Value=="K" ) ? 10 : (index > 2) ? 0 : 11
        if(value==0) ace++;
        points += value
        index++;
    }
    if(ace!=0) {
        if(points + 11 + ace-1 < 21) points += 11+ace-1
        else points += ace
    }
    return points;
}

function getHand(hand){
    let handString = ""
    for(card of hand){
        handString+= card.Value + `:${card.Suit}:`
    }
    return handString;
}
