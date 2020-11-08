import { Selector } from 'testcafe'


fixture('<md-modal-dialog>')
    .page('http://localhost:8080/')


test('can be opened and closed', async t => {
    await t
        .click('#show-a')
        .expect(Selector('.md-dialog').exists).eql(true)
        .pressKey('esc')
        .expect(Selector('.md-dialog').exists).eql(false)
})


test('different dialogs can be opened and closed', async t => {
    await t
        .click('#show-a')
        .expect(Selector('.md-dialog-title').textContent).contains('Dialog A')
        .pressKey('esc')

        .click('#show-b')
        .expect(Selector('.md-dialog-title').textContent).contains('Dialog B')
})

test('dialog is re-opened in pristine state', async t => {
    await t
        .click('#show-a')
        .typeText('.md-field input', 'abc')
        .pressKey('esc')

        .click('#show-a')
        .expect(Selector('.md-field input').value).eql('')
})

test('passes attributes and props to <md-dialog>', async t => {
    await t
        .click('#show-a')
        .expect(Selector('#dialog-a').exists).eql(true)
        .pressKey('esc')
        .expect(Selector('#dialog-a').exists).eql(false)

        .click('#show-b')
        .pressKey('esc')
        .expect(Selector('#dialog-b').exists).eql(true)
})

test('passes listeners to <md-dialog>', async t => {
    await t
        .click('#show-a')
        .expect(Selector('#event').textContent).eql('md-opened')
})

test('passes properties to the dialog', async t => {
    await t
        .click('#show-b')
        .expect(Selector('#msg1').textContent).eql('A message from the Demo component')
        .expect(Selector('#msg2').textContent).eql('A message from the Demo component')
})

test('receives primitive return values from the dialog', async t => {
    const text = String(Math.random())
    await t
        .click('#show-a')
        .pressKey('esc')
        .expect(Selector('#returned').textContent).eql('cancelled by ESC')

        .click('#show-a')
        .typeText('.md-field input', text)
        .click('#ok-button')
        .expect(Selector('#returned').textContent).eql(text)
})

test('receives objects returned from the dialog', async t => {
    const text = String(Math.random())
    await t
        .click('#show-b')
        .click('#cancel-button')
        .expect(Selector('#returned').textContent).eql('{\n  "reason": "cancelled"\n}')

        .click('#show-b')
        .typeText('.md-field input', text)
        .click('#ok-button')
        .expect(Selector('#returned').textContent).eql('{\n  "result": "' + text + '"\n}')
})
