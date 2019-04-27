const { fiat, crypto } = ctx.params;
		const exchangePrice = new Promise((resolve, reject) => {
			client.getSpotPrice({ 'currencyPair':`${crypto}-${fiat}` }, (err, price) => {
				if (price) {
					resolve(price);
				} else {
					reject(err);
				}
			});
		});
		
		return exchangePrice.then(price => {
			return { 
				'message': `Current ${crypto} price in ${fiat} : ${price.data.amount}`, 
			};
		}).catch(err => {
			return err;
		});