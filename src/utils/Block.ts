import { EventBus } from "./EventBus";
import { nanoid } from "nanoid";

class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow-component-did-mount",
    FLOW_CDU: "flow-component-did-update",
    FLOW_RENDER: "flow-reender"
  };

  public id = nanoid(6)

  private _element: HTMLElement | null = null;
}
