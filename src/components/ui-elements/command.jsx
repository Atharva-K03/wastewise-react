import React, { useState, useEffect, useCallback } from "react";
import {
  Modal,
  InputGroup,
  Form,
  ListGroup,
  Button,
} from "react-bootstrap";

/**
 * 100% React Bootstrap Command Palette
 */

export function CommandDialog({
  show,
  onHide,
  title = "Command Palette",
  description = "Search for a command...",
  commands = [], // [{ label, shortcut, onSelect, group }]
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  const groupLabels = [...new Set(filtered.map((cmd) => cmd.group))];

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev + 1 < filtered.length ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
      } else if (e.key === "Enter") {
        e.preventDefault();
        filtered[selectedIndex]?.onSelect?.();
        onHide();
      }
    },
    [filtered, selectedIndex, onHide]
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, show]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      onKeyDown={handleKeyDown}
      centered
      aria-labelledby="command-palette-title"
      aria-describedby="command-palette-desc"
    >
      <Modal.Header closeButton className="py-2">
        <Modal.Title id="command-palette-title" className="fs-6">
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-3 pb-2">
        <InputGroup className="mb-2" role="search">
          <InputGroup.Text>
            <span role="img" aria-label="search">🔍</span>
          </InputGroup.Text>
          <Form.Control
            placeholder={description}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </InputGroup>

        {filtered.length === 0 ? (
          <div className="text-muted text-center py-3">No commands found.</div>
        ) : (
          <div
            role="listbox"
            aria-label="Command options"
            className="overflow-auto"
            style={{ maxHeight: "300px" }}
          >
            {groupLabels.map((group, groupIdx) => (
              <div key={groupIdx} className="mb-1">
                {group && (
                  <div className="px-2 pt-2 pb-1 text-muted text-uppercase small fw-bold">
                    {group}
                  </div>
                )}
                <ListGroup variant="flush">
                  {filtered
                    .filter((cmd) => cmd.group === group)
                    .map((cmd, i) => {
                      const globalIndex = filtered.indexOf(cmd);
                      const isSelected = selectedIndex === globalIndex;

                      return (
                        <ListGroup.Item
                          key={globalIndex}
                          role="option"
                          aria-selected={isSelected}
                          action
                          onClick={() => {
                            cmd.onSelect?.();
                            onHide();
                          }}
                          className={`d-flex justify-content-between align-items-center ${
                            isSelected ? "bg-primary text-white" : ""
                          }`}
                        >
                          <span>{cmd.label}</span>
                          {cmd.shortcut && (
                            <span className="text-muted small">
                              {cmd.shortcut}
                            </span>
                          )}
                        </ListGroup.Item>
                      );
                    })}
                </ListGroup>
              </div>
            ))}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}
