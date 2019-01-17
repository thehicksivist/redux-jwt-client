import React from 'react'
import renderer from 'react-test-renderer'
import SignIn from './SignIn'

describe('Bookmark snapshot', () => {
    it('Should render as expected with login error', () => {
        const tree = renderer.create(
            // <SignIn loginError={store.getState().loginError} handleSignIn={this.handleSignIn} />
            // the above is what is defined is in our app.js, so we need to pass in the expected fields 
            // in the test (below)
            <SignIn loginError="login error" handleSignIn={() => {}} />
        )
        // tree is the above mock-up 
        expect(tree.toJSON()).toMatchSnapshot()
    })
})

describe('Bookmark snapshot', () => {
    it('Should render as expected without login error', () => {
        const tree = renderer.create(
            // <SignIn loginError={store.getState().loginError} handleSignIn={this.handleSignIn} />
            // the above is what is defined is in our app.js, so we need to pass in the expected fields 
            // in the test (below), the {} are used to write js
            <SignIn loginError={null} handleSignIn={() => {}} />
        )
        // tree is the above mock-up 
        expect(tree.toJSON()).toMatchSnapshot()
    })
})