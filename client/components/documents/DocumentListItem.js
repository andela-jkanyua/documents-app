import React, { PropTypes } from 'react';
import {
  CardText, Card, CardTitle, CardActions, CardMenu,
} from 'react-mdl/lib/Card';
import Menu, { MenuItem } from 'react-mdl/lib/Menu';
import IconButton from 'react-mdl/lib/IconButton';
import marked from 'marked';
import createDocumentView from 'app/containers/util/createDocumentView';
import ShortDocumentInfo from './ShortDocumentInfo';

const style = {
  marginBottom: '2em',
  minHeight: 'auto',
  overflow: 'visible',
  position: 'relative',
};

const trim = (string, maxLength) => {
  if (string.length > maxLength) {
    return `${string.slice(0, maxLength)}...`;
  }
  return string;
};

export const DocumentListItem = props => (
  <Card shadow={0} style={style}>
    <CardTitle
      style={{ marginRight: '3em', position: 'relative' }}
      title="Click to view entire document"
      className="pointer doclist-item__title"
      onClick={e => {
        e.preventDefault();
        props.onDocumentClick(props._id);
      }}>
      {props.title}
    </CardTitle>
    <CardText
      dangerouslySetInnerHTML={{
        // strip html tags for preview
        __html: marked(trim(props.content, 200)).replace(/<(?:.|\n)*?>/gm, ''),
      }}
      style={{ height: '9rem' }}
    />
    <CardActions border style={{ padding: '0' }} />
    <CardText>
      <ShortDocumentInfo {...props} className="doclist-item__info" />
    </CardText>
    <CardMenu>
      <IconButton name="more_vert" id={`documents-${props._id}`} />
      <Menu
        target={`documents-${props._id}`}
        align="right">
        <MenuItem
          onClick={() => { props.onDocumentClick(props._id); }}>
          View
        </MenuItem>
        {props.canEdit &&
          <MenuItem onClick={props.onEditClick}>Edit</MenuItem>
        }
        {props.canDelete &&
          <MenuItem onClick={props.onDeleteClick}>Delete</MenuItem>
        }
      </Menu>
    </CardMenu>
  </Card>
);

DocumentListItem.propTypes = {
  _id: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  canEdit: PropTypes.bool,
  canDelete: PropTypes.bool,
};

export default createDocumentView(DocumentListItem);
