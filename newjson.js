{
	"version" : 2,
	"legacy id" : 192,
	"title" : "Vancomycin",
	"pdb_id" : "1e4e.pdb",
	"authors" : "David Goodsell",
	"keywords" : [
		"antibiotic resistance",
		"glycopeptide antibiotics",
		"resistance evolution",
		"vancomycin"
	],
	"subcategory_ids" : [
		8,
		9
	],	
	"month_name" : "December",
	"month" : 12,
	"year" : 2015,
	"teaser" : "The antibiotic vancomycin blocks the construction of bacterial cell walls.",
	"content" : [
		{
			"parts" : [
				{
					"heading" : "Introduction",
					"paragraph" : "Much of our current arsenal of antibiotics is borrowed from the world's true experts in infection control: bacteria and fungi. These organisms protect themselves with a bewildering collection of exotic chemical weapons, evolved to attack weak points in their competitors. Many of these antibiotic compounds, such as penicillin, attack enzymes, blocking their action and ultimately killing the infecting bacterium. Vancomycin, on the other hand, attacks the thing being build by a bacterial enzyme."
				},
				{
					"image_caption" : "This structure includes vancomycin (blue) and a short analogue of a bacterial peptidoglycan chain (red).",
					"JPEG_image_file_name" : "192-Vancomycin_1fvm.jpg",
					"TIFF_image_file_name" : "192-Vancomycin_1fvm.tif"
				},
				{
					"heading" : "Blocking Construction",
					"content" : "Bacteria build a sturdy cell wall composed of sugar chains crosslinked by short peptides, forming a network called peptidoglycan. This network is built in many steps, laying down the sugar chains and building the peptide connectors. Vancomycin acts near the end of this process. One end of the crosslinking peptide has two alanine amino acids (more specifically, D-alanines, with stereochemistry opposite from the normal L-alanines). To form the crosslink, the final alanine is popped off, and the peptide is attached to a neighboring peptide. As shown here in PDB entry <span class=\"rcsb_id_tag\" title=\"Vancomycin\"><a href='http://www.rcsb.org/pdb/explore/explore.do?structureId=1fvm' target='_blank'>1fvm <i class='fa fa-external-link'> </i></a></span>, vancomycin binds tightly to this D-alanine-D-alanine peptide, blocking the ability to form the crosslink."
				},
				{
					"heading" : "Positive and Negative",
					"content" : "Only some bacteria are susceptible to vancomycin. Bacteria such as <I>Staphylococcus</I> have a thick layer of peptidoglycan that surrounds the cell, and are termed gram positive because of the way this peptidoglycan takes up crystal violet stain when observed in the microscope. Vancomycin is effective for blocking formation of this  type of cell wall and is currently used as a last resort antibiotic for persistent infections by these bacteria. Gram negative bacteria such as <I>Escherichia coli</I>, on the other hand, build their peptidoglycan beneath an outer membrane, where it is protected from this stain and from attack by vancomycin. So, smaller antibiotics like penicillin are needed to get inside in these bacteria."	
				}
			]
		},
		{
			"parts" : [
				{
					"image_caption" : "VanA reconstructed from a 30,000 year old bacterium, with bound ATP in red.",
					"JPEG_image_file_name" : "192-Vancomycin_3se7.jpg",
					"TIFF_image_file_name" : "192-Vancomycin_3se7.tif"
				},
				{
					"heading" : "Ancient Resistance",
					"content" : "Bacteria become resistant to vancomycin by getting rid of its target. The protein VanA, with the help of two other proteins, adds a lactate group instead of alanine to the end of the peptidoglycan chain. This works just as well for the crosslinking, but is not susceptible to the antibiotic. The structure shown here is VanA from an ancient bacterium, recreated from DNA from 30,000 year old permafrost sediments (PDB entry <span class=\"rcsb_id_tag\" title=\"VanA\"><a href='http://www.rcsb.org/pdb/explore/explore.do?structureId=3se7' target='_blank'>3se7 <i class='fa fa-external-link'> </i></a></span>). Surprisingly, it is very similar to VanA made by modern bacteria, showing that this war of antibiotics and resistance began long before medical science discovered the utility of antibiotics. You can compare the ancient and modern proteins using the <A HREF=\"http://www.rcsb.org/pdb/workbench/showPrecalcAlignment.do?action=pw_fatcat&name1=1E4E.A&name2=3SE7.A\"> Structure Comparison Tool.</A>"
				}
			]
		},
		{
			"parts" : [
				{
					"heading" : "Exploring the Structure",
					"content" : "We can learn about the evolution of VanA by looking at other bacterial proteins. VanA is a D-alanine-D-lactate ligase, indicating that it adds lactate to the growing peptidoglycan chain. The enzyme that makes the normal peptidoglycan is a D-alanine-D-alanine ligase, which adds alanine to the chain. Comparing the two structures, from PDB entries <span class=\"rcsb_id_tag\" title=\"VanA\"><a href='http://www.rcsb.org/pdb/explore/explore.do?structureId=1e4e' target='_blank'>1e4e <i class='fa fa-external-link'> </i></a></span> and <span class=\"rcsb_id_tag\" title=\"D-alanine-D-alanine ligase\"><a href='http://www.rcsb.org/pdb/explore/explore.do?structureId=2dln' target='_blank'>2dln <i class='fa fa-external-link'> </i></a></span>, shows that they are quite similar, providing evidence that the enzyme providing resistance evolved from the normal enzyme. To explore these two structures in more detail, click on the image for an interactive JSmol."					
				},
				{
					"JPEG_image_file_name" : "192-Vancomycin_1e4e_2dln_JSmol.jpg",
					"TIFF_image_file_name" : "192-Vancomycin_1e4e_2dln_JSmol.tif"
				}
			]
		}
	],
	"tfes" : [
		"You can explore a variety of similar antibiotics and the enzymes involved in synthesizing them by searching for \"glycopeptide antibiotics.\"",
		"You can look at the VanX protein in PDB entry <span class=\"rcsb_id_tag\" title=\"VanX\">1r44</span>, which is also needed for resistance against vancomycin. It is a small enzyme that breaks down any D-alanine-D-alanine peptides that may be present in the cell wall, making room for VanA to build its modified peptides."
	],
	"references" : [
		"3se7: V. M. D'Costa, C. E. King, L. Kalan, M. Morar, W. W. L. Sung, C. Schwarz, D. Froese, G. Zazula, F. Calmels, R. Debruyne, G. B. Golding, H. N. Poinar & G. D. Wright (2011) Antibiotic resistance is ancient. Nature 477, 457-461.",
		"1fvm: Y. Nitanai, T. Kikuchi, K. Kakoi, S. Hanamaki, I. Fujisawa & K. Aoki (2009) Crystal structures of the complexes between vancomycin and cell-wall precursor analogs. Journal of Molecular Biology 385, 1422-1432.",
		"1e4e: D. I. Roper, T. Huyton, A. Vagin & G. Dodson (2000) The molecular basis of vancomycin resistance in clinically relevant Enterococci: crystal structure of D-alanyl-D-lactate ligase (VanA). Proceedings of the National Academy of Sciences USA 97, 8921-8925.",
		"2dln: C. Fan, P. C. Moews, C. T. Walsh & J. R. Knox (1994) Vancomycin resistance: structure of D-alanine:D-alanine ligase at 2.3 A resolution. Science 266, 439-443.",
		"J. C. J. Barna & D. H. Williams (1984) The structure and mode of action of glycopeptide antibiotics of the vancomycin group. Annual Reviews of Microbiology 38, 339-357."
	],
	"jmol" : [
		{
			"parts" : [
				{
					"heading" : "VanA and D-alanine-D-alanine Ligase (PDB entries 1e4e and 2dln)",
					"content" : "Structures of VanA and D-alanine-D-alanine ligase are superimposed to show their similar structure. Both enzymes require ATP (pink) and magnesium (magenta) for their reaction. Use the buttons to change the representation and switch between the two enzymes.<br><br><form name=\"jmolOptions1\"><input type=\"radio\" name=\"mol1\" onclick=\"Jmol.script(jmolApplet0, 'select protein;cpk off;cartoon off;backbone 150;color group', 'momJmol')\" checked> show protein backbone<br><input type=\"radio\" name=\"mol1\" onclick=\"Jmol.script(jmolApplet0, 'select protein;cpk off;cartoon;color structure;backbone off', 'momJmol')\" > show protein cartoon<br><input type=\"radio\" name=\"mol1\" onclick=\"Jmol.script(jmolApplet0, 'select protein;cpk;color cpk;cartoon off;backbone off', 'momJmol')\" > show protein atoms<br></form><br><br></form><form name=\"jmolOptions2\"><input type=\"radio\" name=\"mol2\" onclick=\"Jmol.script(jmolApplet0, 'display */1', 'momJmol')\" checked> show VanA<br><input type=\"radio\" name=\"mol2\" onclick=\"Jmol.script(jmolApplet0, 'display */2', 'momJmol')\" > show D-alanine-D-alanine Ligase<br></form>",
					"files" : [
						"1e4e_align.pdb",
						"2dln_align.pdb"				
					],
					"script" : "model *; select all; wireframe off; cpk off; select all; backbone 150; color group; select ligand; cpk; color white; select ADP; cpk; color pink; select magnesium; cpk; color magenta; rotate z 169.; rotate y 81.; rotate z 22.; zoom 120.; background black; display */1; center ligand; "
				}
			]
		}
	]
}
