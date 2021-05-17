import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import LargeServiceLogic from "./LargeService.logic";

afterEach(cleanup);

test("Large service renders");
