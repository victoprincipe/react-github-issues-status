import React, { useEffect, useState } from 'react';
import ThemeToggleButton from './ThemeToggleButton';
import {
  Table,
  List,
  Label,
  Placeholder,
  Popup,
  Button,
} from 'semantic-ui-react';

function IssuesTable() {
  const [issuesData, setIssuesData] = useState('loading');
  const [toggleTheme, setToggleTheme] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/repos/facebook/react/issues')
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          return 'error';
        }
      })
      .then(function (data) {
        setTimeout(() => {
          setIssuesData(data !== 'error' ? [...data] : 'error');
        }, 1000);
      })
      .catch((err) => {
        console.error(err);
        setIssuesData('error');
      });
  }, []);

  const renderTableData = (data) => {
    return data.map((d) => {
      return (
        <Table.Row key={d.id}>
          <Table.Cell key={d.id + d.number}>{d.number}</Table.Cell>
          <Popup
            key={d.id + d.title}
            mouseEnterDelay={500}
            mouseLeaveDelay={100}
            on='hover'
            trigger={<Table.Cell>{d.title}</Table.Cell>}
            content={
              d.body.length > 500
                ? d.body.substring(0, 500).replace(/<[^>]*>/gi, '') + '...'
                : d.body.substring(0, 500).replace(/<[^>]*>/gi, '')
            }
            basic
          />
          <Table.Cell key={d.id + d.created_at}>
            {new Date(d.created_at).toLocaleString()}
          </Table.Cell>
          <Table.Cell key={d.id + d.updated_at}>
            {new Date(d.updated_at).toLocaleString()}
          </Table.Cell>
          <Table.Cell>
            <List>{renderLabels(d.labels)}</List>
          </Table.Cell>
          <Table.Cell>{d.state}</Table.Cell>
        </Table.Row>
      );
    });
  };

  const renderTablePlaceholder = (num) => {
    const placeholders = [];
    const placeholderCells = [];

    for (let i = 0; i < 6; i++) {
      placeholderCells.push(
        <Table.Cell key={i}>
          <Placeholder inverted={!toggleTheme}>
            <Placeholder.Line />
          </Placeholder>
        </Table.Cell>
      );
    }

    for (let i = 0; i < num; i++) {
      placeholders.push(<Table.Row key={i}>{placeholderCells}</Table.Row>);
    }

    return placeholders;
  };

  const renderLabels = (lab) => {
    return lab.map((l) => {
      return (
        <List.Item key={l.id}>
          <Label style={{ backgroundColor: '#' + l.color }} horizontal>
            {l.name}
          </Label>
        </List.Item>
      );
    });
  };

  return (
    <>
      <ThemeToggleButton
        toggleTheme={toggleTheme}
        action={() => {
          setToggleTheme(!toggleTheme);
        }}
      />
      <Table
        celled
        striped
        selectable
        sortable
        inverted={!toggleTheme}
        style={{ margin: 0, transition: 'all 0.6s' }}
      >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Issue Number</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Created At</Table.HeaderCell>
            <Table.HeaderCell>Updated At</Table.HeaderCell>
            <Table.HeaderCell>renderLabels</Table.HeaderCell>
            <Table.HeaderCell>State</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issuesData !== 'loading'
            ? renderTableData(issuesData)
            : renderTablePlaceholder(15)}
        </Table.Body>
      </Table>
    </>
  );
}

export default IssuesTable;
