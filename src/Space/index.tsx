import classNames from 'classnames';
import React, { ReactNode } from 'react';
import './style.css';

export interface ISpaceProps {
	/** 组件额外的 CSS className */
	className?: string;
	/** 子元素 */
	children?: ReactNode;
	/** @description 间隔大小 @default md */
	size?: 'sm' | 'md' | 'lg';
}
const Space = (props: ISpaceProps) => {
	const { className, size = 'md', children } = props;
	const cls = classNames('space', {
		[`space-${size}`]: size,
		className,
	});
	return <div className={cls}>{children}</div>;
};

export default Space;
