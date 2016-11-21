import React, { PropTypes } from 'react';
import {
  Accordion,
  Panel,
  Glyphicon,
  Alert,
  Button
} from 'react-bootstrap';

import EntryPointDetails from './EntryPointDetails';
/*
  EntryPointTree liste les EntryPoints à afficher.
  Permet également d'appliquer un filtre sur le nom
*/

export default class EntryPointTree extends React.Component {
  static propTypes = {
    entryPoints: PropTypes.array,
    search: PropTypes.string,
    handleEntryPoint: PropTypes.func,
    remove: PropTypes.func
  }

  static defaultProps = {
    entryPoints: []
  };

  state = {};

  handleRemove = (e, key) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.remove(key);
  }

  openPanel = key => this.setState({ [`panel${key}IsOpen`]: true });
  closePanel = key => this.setState({ [`panel${key}IsOpen`]: false });

  render() {
    const mask = `${this.props.search}.*`;
    const { entryPoints, handleEntryPoint } = this.props;
    const list = entryPoints
      .filter(entryPoint => entryPoint.name.match(mask));

    if (!list.length) {
      return (<Alert bsStyle="info" className="m0">
        <strong>Holy guacamole!</strong> Nothing to display.
      </Alert>);
    }

    return (
      <Accordion>
        {list.map((entryPoint, key) => {
          const isOpen = this.state[`panel${key}IsOpen`];
          return (
            <Panel
              key={key}
              header={<span>
                <Button
                  bsSize="xsmall"
                  className="pull-right btn-link"
                  onClick={e => this.handleRemove(e, key)}
                >
                  <Glyphicon
                    className="text-danger"
                    glyph="remove"
                    title="Remove"
                  />
                </Button>
                {entryPoint.name}
              </span>}
              eventKey={key}
              expanded={isOpen}
              onSelect={this.openPanel.bind(key)}
              onExited={this.closePanel.bind(key)}
            >
              {isOpen && <EntryPointDetails
                key={key}
                idPoint={key}
                entryPoint={entryPoint}
                handleEntryPoint={handleEntryPoint}
              />}
            </Panel>
          );
        })}
      </Accordion>
    );
  }
}
