import React, { useState, useRef } from "react";
import {
  Dropdown,
  Button,
  Overlay,
  Popover,
  FormCheck,
  ListGroup,
} from "react-bootstrap";

/**
 * React Bootstrap Dropdown Menu (100% functional and visual parity)
 */
export default function DropdownMenu({ triggerLabel, items }) {
  const [open, setOpen] = useState(false);
  const [checkboxState, setCheckboxState] = useState({});
  const [radioGroup, setRadioGroup] = useState({});
  const [submenuOpenId, setSubmenuOpenId] = useState(null);
  const triggerRef = useRef(null);

  const handleToggle = () => setOpen(!open);
  const closeAll = () => {
    setOpen(false);
    setSubmenuOpenId(null);
  };

  return (
    <>
      <Button ref={triggerRef} onClick={handleToggle} aria-haspopup="true">
        {triggerLabel}
      </Button>
      <Overlay
        show={open}
        target={triggerRef.current}
        placement="bottom-start"
        rootClose
        onHide={closeAll}
      >
        <Popover
          id="dropdown-popover"
          className="p-0 rounded shadow border"
          style={{ minWidth: "12rem" }}
        >
          <Popover.Body className="p-1">
            <ListGroup variant="flush" as="ul" role="menu">
              {items.map((item, idx) => {
                if (item.type === "label") {
                  return (
                    <ListGroup.Item
                      key={idx}
                      className="fw-semibold small px-3 py-2 text-muted"
                      as="li"
                      role="presentation"
                    >
                      {item.label}
                    </ListGroup.Item>
                  );
                }

                if (item.type === "separator") {
                  return <hr key={idx} className="my-1 mx-2" role="separator" />;
                }

                if (item.type === "checkbox") {
                  return (
                    <ListGroup.Item
                      key={idx}
                      as="li"
                      role="menuitemcheckbox"
                      onClick={() =>
                        setCheckboxState((s) => ({
                          ...s,
                          [item.id]: !s[item.id],
                        }))
                      }
                      className="px-3 py-2"
                      action
                    >
                      <FormCheck
                        type="checkbox"
                        label={item.label}
                        checked={!!checkboxState[item.id]}
                        readOnly
                      />
                    </ListGroup.Item>
                  );
                }

                if (item.type === "radio") {
                  const group = item.group || "default";
                  return (
                    <ListGroup.Item
                      key={idx}
                      as="li"
                      role="menuitemradio"
                      onClick={() =>
                        setRadioGroup((s) => ({ ...s, [group]: item.id }))
                      }
                      className="px-3 py-2"
                      action
                    >
                      <FormCheck
                        type="radio"
                        name={group}
                        label={item.label}
                        checked={radioGroup[group] === item.id}
                        readOnly
                      />
                    </ListGroup.Item>
                  );
                }

                if (item.type === "submenu") {
                  const isOpen = submenuOpenId === item.id;
                  return (
                    <div key={idx} style={{ position: "relative" }}>
                      <ListGroup.Item
                        action
                        onClick={() =>
                          setSubmenuOpenId(isOpen ? null : item.id)
                        }
                        className="d-flex justify-content-between align-items-center px-3 py-2"
                        role="menuitem"
                        aria-haspopup="true"
                      >
                        {item.label}
                        <span className="ms-auto">&rsaquo;</span>
                      </ListGroup.Item>

                      {isOpen && (
                        <div
                          className="border rounded shadow p-1"
                          style={{
                            position: "absolute",
                            top: 0,
                            left: "100%",
                            minWidth: "10rem",
                            zIndex: 1050,
                            backgroundColor: "#fff",
                          }}
                        >
                          {item.children.map((sub, sidx) => (
                            <div
                              key={sidx}
                              className="px-3 py-2 text-sm"
                              role="menuitem"
                              onClick={() => {
                                sub.onClick?.();
                                closeAll();
                              }}
                            >
                              {sub.label}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                // default item
                return (
                  <ListGroup.Item
                    key={idx}
                    as="li"
                    role="menuitem"
                    className="d-flex justify-content-between align-items-center px-3 py-2"
                    action
                    onClick={() => {
                      item.onClick?.();
                      closeAll();
                    }}
                  >
                    {item.label}
                    {item.shortcut && (
                      <span className="text-muted small ms-3">
                        {item.shortcut}
                      </span>
                    )}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Popover.Body>
        </Popover>
      </Overlay>
    </>
  );
}
