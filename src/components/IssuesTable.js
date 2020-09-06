import React, { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Table, List, Label, Placeholder, Popup } from 'semantic-ui-react';

function IssuesTable() {
  const [issuesData, setIssuesData] = useState('loading');

  useEffect(() => {
    fetch('https://api.github.com/repos/facebook/react/issues')
      .then((resp) => resp.json()) // Transform the data into json
      .then(function (data) {
        setTimeout(() => {
          setIssuesData([...data]);
        }, 1000);
      });
  }, []);

  const TableData = (data) => {
    return data.map((d) => {
      return (
        <Table.Row
          key={d.id}
          onClick={() => {
            window.location.href = d.html_url;
          }}
          style={{ cursor: 'pointer' }}
        >
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
            <List>{Labels(d.labels)}</List>
          </Table.Cell>
          <Table.Cell>{d.state}</Table.Cell>
        </Table.Row>
      );
    });
  };

  const TablePlaceholder = (num) => {
    const placeholders = [];
    const placeholderCells = [];

    for (let i = 0; i < 6; i++) {
      placeholderCells.push(
        <Table.Cell key={i}>
          <Placeholder>
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

  const Labels = (lab) => {
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
    <Table celled striped selectable sortable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Issue Number</Table.HeaderCell>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Created At</Table.HeaderCell>
          <Table.HeaderCell>Updated At</Table.HeaderCell>
          <Table.HeaderCell>Labels</Table.HeaderCell>
          <Table.HeaderCell>State</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issuesData !== 'loading'
          ? TableData(issuesData)
          : TablePlaceholder(15)}
      </Table.Body>
    </Table>
  );
}

export default IssuesTable;