function AsciiTable()
	local overrides = { [0]="(Null)", [9]="(Tab)",[10]="(\\n Newline)", [13]="(\\r Return)", [32]="(Space)"}
	local c
	for n=0,126 do
		if overrides[n] then c = overrides[n] else c = string.char(n) end
		print (string.format("%03d 0x%02x %s", n, n, c))
	end
end
AsciiTable()