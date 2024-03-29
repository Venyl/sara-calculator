<script lang="ts">
	import { createCombobox, melt, type ComboboxOptionProps } from '@melt-ui/svelte';
	import { slide } from 'svelte/transition';
	import { clothingGroups, type Clothing } from '$lib/clothes';

	function toOption(item: Clothing): ComboboxOptionProps<Clothing> {
		return { value: item, label: item.name, disabled: false };
	}

	const {
		elements: { menu, input, option, label, group, groupLabel },
		states: { open, inputValue, touchedInput, selected },
		helpers: { isSelected }
	} = createCombobox<Clothing, true>({
		multiple: true,
		forceVisible: true
	});

	function filterGroup(key: keyof typeof clothingGroups, searchValue: string) {
		if (key.includes(searchValue.toLowerCase())) {
			return clothingGroups[key];
		}
		return clothingGroups[key].filter((clothing) => {
			const normalizedInput = searchValue.toLowerCase();
			return clothing.name.toLowerCase().includes(normalizedInput);
		});
	}

	$: filteredClothing = $touchedInput
		? Object.fromEntries(
				Object.entries(clothingGroups).map(([key, _]) => [key, filterGroup(key, $inputValue)])
			)
		: clothingGroups;

	$: noResults = Object.values(filteredClothing).every((clothes) => clothes.length === 0);

	$: selectedGroups = Object.keys(clothingGroups).filter((clothingGroup) =>
		clothingGroups[clothingGroup].every((clothing) =>
			$selected?.find((selectedItem) => selectedItem.label === clothing.name)
		)
	);

	function selectGroup(key: keyof typeof clothingGroups) {
		const clothes = clothingGroups[key];
		if (
			clothes.every((clothing) =>
				$selected?.find((selectedItem) => {
					console.log(selectedItem);
					console.log(clothing);
					return selectedItem.label === clothing.name;
				})
			)
		) {
			$selected = $selected?.filter(
				(selectedItem) => !clothes.find((clothing) => clothing.name === selectedItem.label)
			);
			return;
		}
		$selected = [
			...($selected ?? []),
			...clothes
				.filter(
					(clothing) =>
						$selected?.find((selectedItem) => selectedItem.label === clothing.name) === undefined
				)
				.map(toOption)
		];
	}
</script>

<div class="grid max-w-max">
	<!-- svelte-ignore a11y-label-has-associated-control - $label contains the 'for' attribute -->
	<label use:melt={$label} class="text-md mb-1"> Clothing </label>
	<input
		use:melt={$input}
		class="outline-0 rounded-md px-1 py-0.5 bg-surface-500 border-surface-300"
	/>
</div>
{#if $open}
	<ul
		use:melt={$menu}
		transition:slide={{ duration: 200 }}
		class="rounded-md overflow-clip bg-surface-700 px-2 py-4 max-h-72 overflow-y-auto"
	>
		{#if noResults}
			<li class="text-center text-surface-100 font-bold">No results</li>
		{:else}
			{#each Object.entries(filteredClothing) as [key, clothes]}
				{#if clothes.length > 0}
					{@const groupSelected = clothes.every((clothing) =>
						$selected?.find((selectedItem) => selectedItem.label === clothing.name)
					)}
					<div use:melt={$group(key)} class="py-1 rounded-md has-[button:hover]:bg-surface-600">
						<button
							use:melt={$groupLabel(key)}
							data-selected={groupSelected}
							class="text-lg font-medium text-primary-100 mx-2 w-full text-left cursor-pointer rounded-md"
							on:click={() => selectGroup(key)}>{key.replace(/_/g, ' ')}</button
						>

						{#each clothes as clothing}
							<li
								use:melt={$option(toOption(clothing))}
								class="flex items-center gap-1 p-2 rounded-md cursor-pointer hover:bg-surface-600"
							>
								<div class="size-4">
									{#if $isSelected(clothing)}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 16 16"
											fill="currentColor"
											class="text-primary-200"
										>
											<path
												fill-rule="evenodd"
												d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
												clip-rule="evenodd"
											/>
										</svg>
									{/if}
								</div>
								<span use:melt={$label}>{clothing.name}</span>
							</li>
						{/each}
					</div>
				{/if}
			{/each}
		{/if}
	</ul>
{/if}
<div class="flex items-center mt-4 gap-1">
	<svg class="mr-1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
		><path
			fill="none"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23"
		/></svg
	>
	<span class="font-medium">{$selected?.length ?? 0}</span><span class="text-sm">/</span><span
		class="font-medium">{Object.values(clothingGroups).flat().length}</span
	>
</div>
<div>
	<div class="flex items-center mt-4 gap-1">
		<svg class="mr-1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
			><path
				fill="currentColor"
				d="M6 2a2 2 0 0 0-2 2v15c0 1.11.89 2 2 2v1h2v-1h8v1h2v-1c1.11 0 2-.89 2-2V4a2 2 0 0 0-2-2zm0 2h5v15H6zm7 0h5v15h-5zm-5 6v3h2v-3zm6 0v3h2v-3z"
			/></svg
		>
		<span class="font-medium">{selectedGroups?.length ?? 0}</span><span class="text-sm">/</span
		><span class="font-medium">{Object.keys(clothingGroups).length}</span>
	</div>
	<div>
		{selectedGroups.map((selectedGroup) => selectedGroup.replace('_', ' ')).join(', ')}
	</div>
</div>
<!-- <pre>{JSON.stringify($selected, null, 2)}</pre> -->
