<script lang="ts">
	import { createCombobox, melt, type ComboboxOptionProps } from '@melt-ui/svelte';

	const clothingGroups: Record<string, string[]> = {
		set1: ['tshirt', 'pants', 'jacket'],
		set2: ['hat', 'shoes']
	};

	function toOption(item: string): ComboboxOptionProps<string> {
		return { label: item, value: item };
	}

	const {
		elements: { menu, input, option, label, group, groupLabel },
		states: { open, inputValue, touchedInput, selected },
		helpers: { isSelected }
	} = createCombobox<string, true>({
		multiple: true
	});

	$: filteredClothing = $touchedInput
		? {
				set1: clothingGroups.set1.filter((clothing) => {
					const normalizedInput = $inputValue.toLowerCase();
					return clothing.toLowerCase().includes(normalizedInput);
				}),
				set2: clothingGroups.set2.filter((clothing) => {
					const normalizedInput = $inputValue.toLowerCase();
					return clothing.toLowerCase().includes(normalizedInput);
				})
			}
		: clothingGroups;

	function selectGroup(key: keyof typeof clothingGroups) {
		const clothes = clothingGroups[key];
		if (
			clothes.every((clothing) =>
				$selected?.find((selectedItem) => selectedItem.value === clothing)
			)
		) {
			$selected = $selected?.filter((selectedItem) => !clothes.includes(selectedItem.value));
			return;
		}
		$selected = [
			...($selected ?? []),
			...clothes
				.filter(
					(clothing) =>
						$selected?.find((selectedItem) => selectedItem.value === clothing) === undefined
				)
				.map(toOption)
		];
	}
</script>

<!-- <pre>{JSON.stringify($inputValue, null, 2)}</pre>
<pre>{JSON.stringify($selected, null, 2)}</pre> -->
<div>
	<!-- svelte-ignore a11y-label-has-associated-control - $label contains the 'for' attribute -->
	<label use:melt={$label}>
		<span>Select clothing</span>
	</label>
	<input use:melt={$input} />
</div>
{#if $open}
	<ul use:melt={$menu} class="ring-1">
		{#each Object.entries(filteredClothing) as [key, clothes]}
			{#if clothes.length > 0}
				{@const groupSelected = clothes.every((clothing) =>
					$selected?.find((selectedItem) => selectedItem.value === clothing)
				)}
				<div use:melt={$group(key)}>
					<button
						use:melt={$groupLabel(key)}
						data-selected={groupSelected}
						class="text-xl w-full text-left cursor-pointer bg-amber-100 data-[selected=true]:bg-pink-200"
						on:click={() => selectGroup(key)}>{key}</button
					>

					{#each clothes as clothing}
						<li
							use:melt={$option(toOption(clothing))}
							data-selected={$isSelected(clothing)}
							class="pl-2 cursor-pointer hover:bg-gray-100 data-[selected=true]:bg-green-200 data-[selected=true]:hover:bg-red-200"
						>
							<span use:melt={$label}>{clothing}</span>
						</li>
					{/each}
				</div>
			{/if}
		{/each}
	</ul>
{/if}
