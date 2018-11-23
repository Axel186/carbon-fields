/**
 * External dependencies.
 */
import { Component } from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';
import { xor } from 'lodash';

/**
 * Internal dependencies.
 */
import './style.scss';
import FieldBase from '../../components/field-base';
import NoOptions from '../../components/no-options';
import validator from '../../validators/required';

class SetField extends Component {
	/**
	 * Handles the change of the field.
	 *
	 * @param  {Object} e
	 * @return {void}
	 */
	handleChange = ( e ) => {
		const {
			id,
			value,
			onChange
		} = this.props;

		onChange(
			id,
			xor( value, [ e.target.value ] )
		);
	}

	/**
	 * Checks if the given option is checked.
	 *
	 * @param  {Array} values
	 * @param  {Object} option
	 * @return {boolean}
	 */
	isChecked = ( values, option ) => {
		return values.indexOf( option.value ) > -1;
	}

	/**
	 * Render the component.
	 *
	 * @return {Object}
	 */
	render() {
		const {
			id,
			name,
			value,
			error,
			field
		} = this.props;

		return (
			<FieldBase
				id={ id }
				field={ field }
				error={ error }
			>
				{
					field.options.length > 0
						? (
							<ul className="cf-set__list">
								{ field.options.map( ( option, index ) => (
									<li className="cf-set__list-item" key={ index }>
										<input
											type="checkbox"
											id={ `${ id }-${ option.value }` }
											name={ `${ name }[]` }
											checked={ this.isChecked( value, option ) }
											value={ option.value }
											className="cf-set__input"
											onChange={ this.handleChange }
											{ ...field.attributes }
										/>

										<label className="cf-set__label" htmlFor={ `${ id }-${ option.value }` }>
											{ option.label }
										</label>
									</li>
								) ) }
							</ul>
						)
						: <NoOptions />
				}
			</FieldBase>
		);
	}
}

addFilter( 'carbon-fields.set.validate', 'carbon-fields/core', ( field, value ) => validator( value ) );

export default SetField;
