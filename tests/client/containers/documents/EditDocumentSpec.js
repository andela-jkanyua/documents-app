import { expect } from 'chai';
import sinon from 'sinon';
import { submit, mapStateToProps } from 'app/containers/documents/EditDocument';

describe('EditDocument', () => {
  describe('submit', () => {
    it('updates document', (done) => {
      const context = {
        props: {
          editDocument: sinon.spy(() => Promise.resolve()),
          defaultValues: { _id: 1 },
          onEditSuccess: sinon.spy(),
        },
      };
      const values = {
        title: 'title',
        content: 'content',
      };
      submit(values, context).then(() => {
        expect(
          context.props.editDocument.withArgs(1, values).calledOnce
        ).to.be.true;
        expect(
          context.props.onEditSuccess.calledOnce
        ).to.be.true;
      }).then(done, done);
    });

    it('calls showSnackbar when there is an error', (done) => {
      const context = {
        props: {
          editDocument: sinon.spy(() => Promise.resolve()),
          error: { error: 'error' },
          defaultValues: { _id: 1 },
        },
        showSnackbar: sinon.spy(),
      };
      const values = {
        title: 'title',
        content: 'content',
      };
      submit(values, context).catch(() => {
        expect(context.showSnackbar.calledOnce).to.be.true;
      }).then(done, done);
    });
  });

  describe('mapStateToProps', () => {
    it('maps state to props', () => {
      const state = {
        editDocument: { error: 'error', loading: false },
      };

      const ownProps = {
        document: {
          title: 'title',
          content: 'content',
          access: { read: 'public', write: 'private' },
        },
        onEditSuccess: 'onEditSuccess',
      };

      const expectedProps = {
        error: 'error',
        loading: false,
        onEditSuccess: 'onEditSuccess',
        defaultValues: {
          title: 'title',
          content: 'content',
          readAccess: 'public',
          writeAccess: 'private',
        },
        title: 'Edit Document',
      };

      expect(mapStateToProps(state, ownProps)).to.eql(expectedProps);
    });
  });
});