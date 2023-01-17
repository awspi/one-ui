import classNames from 'classnames';
import React, { ReactNode } from 'react';
import './style.css';

interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
	/** 额外的className */
	className?: string;
	/** 额外的css样式 */
	style?: React.CSSProperties;
	/** 子元素 */
	children?: ReactNode;
	/** @description 按钮颜色 @default default */
	color?: 'default' | 'alternate' | 'dark' | 'light' | 'green' | 'red' | 'yellow' | 'purple';
	/** @description 按钮大小 @default md */
	size: 'sm' | 'md' | 'lg';
	/** 点击事件 */
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	/** 失去焦点事件 */
	onBlur?: React.FocusEventHandler<HTMLButtonElement>;
	/** @description htmlType @default button */
	htmlType?: 'button' | 'submit' | 'reset';
}

const Button = React.forwardRef<HTMLButtonElement, IButtonProps>((props: IButtonProps, ref) => {
	// 默认值
	const { children, className, style, color, size, onClick, onBlur, htmlType } = props;

	// 生成样式
	const cls = classNames('btn', {
		[`btn-${color}`]: color,
		[`btn-${size}`]: size,
		className,
	});

	return (
		<button ref={ref} className={cls} style={style} type={htmlType} onClick={onClick} onBlur={onBlur}>
			{children}
		</button>
	);
});

Button.defaultProps = {
	color: 'default',
	size: 'md',
	htmlType: 'button',
};
export default Button;
