describe('Suggest', function() {
	let suggestInstance,
		container = document.createElement('div');

	beforeEach(function() {
		suggestInstance = new app.suggest.Suggest(container, () => {}, () => {}, [new app.suggest.Suggestion('one'), new app.suggest.Suggestion('two')]);
	});

	describe('changeSelection() UP', function() {
		it('should...', function() {
			let input = suggestInstance.container.querySelector('input');
			input.focus();
			var keydownEvent = new KeyboardEvent('keydown', { key: 'x' });
			input.dispatchEvent(keydownEvent);
		});
	});

	describe('changeSelection() DOWN', function() {
		
	});
});
