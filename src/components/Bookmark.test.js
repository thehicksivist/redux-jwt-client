import React from 'react'
import renderer from 'react-test-renderer'
import Bookmark from './Bookmark'

describe('Bookmark snapshot', () => {
    it('Should render as expected', () => {
        const tree = renderer.create(
            <Bookmark key='123' title='My Bookmark' url="http://www.mybookmark.com" _id="123" remove={() => { }} />
        )
        expect(tree.toJSON()).toMatchSnapshot()
    })
})