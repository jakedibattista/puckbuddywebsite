"use client";

import type { ComponentPropsWithoutRef, MouseEvent, ReactNode } from "react";
import { track } from "@vercel/analytics";
import {
  appStoreAriaLabel,
  appStoreLinkProps,
  useAppStoreDestination,
} from "../hooks/useAppStoreUrl";

type SmartAppLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  children: ReactNode;
  /** Passed to aria-label helper and analytics, e.g. "Monthly subscription". */
  context?: string;
};

export default function SmartAppLink({
  children,
  context = "download",
  "aria-label": ariaLabelProp,
  onClick,
  ...rest
}: SmartAppLinkProps) {
  const destination = useAppStoreDestination();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    track("store_badge_click", { store: destination.platform, location: context });
    onClick?.(event);
  }

  return (
    <a
      href={destination.href}
      aria-label={ariaLabelProp ?? appStoreAriaLabel(destination, context)}
      onClick={handleClick}
      {...appStoreLinkProps(destination)}
      {...rest}
    >
      {children}
    </a>
  );
}
